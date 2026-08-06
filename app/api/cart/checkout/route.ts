import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mobile_no } = await request.json();

    if (!mobile_no) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

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

    // Step 2: Fetch checkout_details from ERP
    const checkoutRes = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.checkout_details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      }
    });

    console.log("checkout_details fetch status:", checkoutRes.status);
    if (!checkoutRes.ok) {
      const errText = await checkoutRes.text();
      console.error("checkout_details failed:", errText);
      return NextResponse.json({ error: 'Failed to fetch checkout details', details: errText }, { status: checkoutRes.status });
    }

    const checkoutData = await checkoutRes.json();
    console.log("checkout_details success data:", checkoutData);
    return NextResponse.json(checkoutData);
  } catch (error: any) {
    console.error('Error fetching checkout details:', error);
    return NextResponse.json({ error: 'Failed to fetch checkout details', msg: error.message }, { status: 500 });
  }
}
