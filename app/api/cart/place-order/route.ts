import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mobile_no, items, coupon_code, payment_type, transaction_amount, email } = await request.json();

    if (!mobile_no || !items) {
      return NextResponse.json({ error: 'Mobile number and items are required' }, { status: 400 });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    const payuClientId = process.env.PAYU_CLIENT_ID;
    const payuSecret = process.env.PAYU_SECRET;
    const payuMerchantId = process.env.PAYU_MERCHANT_ID;

    if (!baseUrl || !apiKey || !apiSecret) {
      console.error('Missing API credentials in environment variables.');
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    // Step 1: Fetch user details for auth keys
    const userRes = await fetch(`${baseUrl}/api/method/shoption_api.erp_api.utility.get_user_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify({ mobile_no }),
    });

    if (!userRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch user auth keys' }, { status: userRes.status });
    }

    const userData = await userRes.json();
    if (!userData.message?.status || !userData.message?.data?.key_details) {
      return NextResponse.json({ error: 'User auth keys not found' }, { status: 401 });
    }

    const userApiKey = userData.message.data.key_details.api_key;
    const userApiSecret = userData.message.data.key_details.api_secret;
    const authorizationHeader = `token ${userApiKey}:${userApiSecret}`;

    // Step 2: Call ERP place_order
    const placeOrderRes = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.place_order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationHeader,
      },
      body: JSON.stringify({
        items,
        delivery_date: null,
        warehouse: null,
        transporter: null,
        coupon_code: coupon_code || null,
        payment_type: payment_type,
        transaction_amount: transaction_amount,
        source: 'Web App'
      }),
    });

    console.log("place_order response status:", placeOrderRes.status);
    if (!placeOrderRes.ok) {
      const errText = await placeOrderRes.text();
      console.error("place_order failed:", errText);
      return NextResponse.json({ error: 'Failed to place order in ERP', details: errText }, { status: placeOrderRes.status });
    }

    const orderData = await placeOrderRes.json();
    if (!orderData.message?.status || !orderData.message?.data) {
      return NextResponse.json({ error: 'ERP rejected order placement', message: orderData.message?.message || '' }, { status: 400 });
    }

    const salesOrder = orderData.message.data.sales_order;
    const actualTransactionAmount = orderData.message.data.transaction_amount || transaction_amount;

    // Step 3: Get PayU OAuth Access Token
    const payuAuthRes = await fetch('https://uat-accounts.payu.in/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: payuClientId,
        client_secret: payuSecret,
        scope: 'create_payment_links',
        grant_type: 'client_credentials'
      })
    });

    if (!payuAuthRes.ok) {
      const errText = await payuAuthRes.text();
      console.error("PayU OAuth failed:", errText);
      return NextResponse.json({ error: 'Failed PayU authorization', details: errText }, { status: payuAuthRes.status });
    }

    const payuAuthData = await payuAuthRes.json();
    const payuAccessToken = payuAuthData.access_token;

    // Step 4: Get transaction ID from ERP
    // Pass order_id in both query parameters and body to ensure compatibility with ERP GET schemas
    const transactionIdUrl = `${baseUrl}/api/method/shoption_api.payment.payment_api.payment_api.get_transactionid`;
    const txIdRes = await fetch(transactionIdUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationHeader,
      },
      body: JSON.stringify({ order_id: salesOrder })
    });

    if (!txIdRes.ok) {
      const errText = await txIdRes.text();
      console.error("Failed to retrieve transaction ID:", errText);
      return NextResponse.json({ error: 'Failed to retrieve transaction ID from ERP', details: errText }, { status: txIdRes.status });
    }

    const txIdData = await txIdRes.json();
    if (!txIdData.message?.status || !txIdData.message?.data?.transaction_id) {
      return NextResponse.json({ error: 'ERP did not return a valid transaction ID', details: txIdData }, { status: 400 });
    }

    const transactionId = txIdData.message.data.transaction_id;

    // Step 5: Calculate expiryDate (100 days from now)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 100);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const expiryDateStr = `${expiry.getFullYear()}-${pad(expiry.getMonth() + 1)}-${pad(expiry.getDate())} 23:59:59`;

    const customerName = userData.message?.data?.Customer_name || userData.message?.data?.customer_name || null;
    let customerPhone = userData.message?.data?.mobile_no || mobile_no || null;
    if (customerPhone && customerPhone.startsWith("+91")) {
      customerPhone = customerPhone.replace("+91", "");
    }
    if (customerPhone) {
      customerPhone = customerPhone.trim().replace(/\D/g, "");
    }
    const customerEmail = userData.message?.data?.user_id || userData.message?.data?.email_id || userData.message?.data?.email || email || null;

    // Step 6: Generate PayU Payment Link
    const payuLinkRes = await fetch('https://uatoneapi.payu.in/payment-links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${payuAccessToken}`,
        'merchantId': payuMerchantId || ''
      },
      body: JSON.stringify({
        subAmount: actualTransactionAmount,
        isPartialPaymentAllowed: false,
        description: 'Test payment link',
        source: 'API',
        order_id: salesOrder,
        transactionId: transactionId,
        expiryDate: expiryDateStr,
        successURL: 'https://uaterp.gbru.in/app',
        failureURL: 'https://uaterp.gbru.in/app',
        udf: { udf1: 'Easypay' },
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        }
      })
    });

    if (!payuLinkRes.ok) {
      const errText = await payuLinkRes.text();
      console.error("PayU link generation failed:", errText);
      return NextResponse.json({ error: 'Failed PayU payment link generation', details: errText }, { status: payuLinkRes.status });
    }

    const payuLinkData = await payuLinkRes.json();
    if (payuLinkData.status !== 0 || !payuLinkData.result?.paymentLink) {
      return NextResponse.json({ error: 'PayU rejected payment link generation', details: payuLinkData }, { status: 400 });
    }

    return NextResponse.json({
      status: true,
      message: 'Order placed and payment link generated successfully',
      sales_order: salesOrder,
      paymentLink: payuLinkData.result.paymentLink
    });
  } catch (error: any) {
    console.error('Error placing order & generating payment link:', error);
    return NextResponse.json({ error: 'Internal server error', msg: error.message }, { status: 500 });
  }
}
