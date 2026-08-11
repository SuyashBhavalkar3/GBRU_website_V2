import { withEncryption } from "@/utils/withEncryption";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function _postHandler(request: Request) {
  try {
    const { mobile_no } = await request.json();
    console.log("[API/CART] Received mobile_no:", JSON.stringify(mobile_no));

    if (!mobile_no) {
      console.log("[API/CART] Mobile number is missing in request body");
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    let sanitizedMobile = mobile_no.toString().replace(/\D/g, '');
    if (sanitizedMobile.length > 10) {
      sanitizedMobile = sanitizedMobile.slice(-10);
    }
    console.log("[API/CART] Sanitized mobile_no to:", JSON.stringify(sanitizedMobile));

    // If it's a dummy or guest mobile number (less than 10 digits), return a clean empty cart response
    if (sanitizedMobile.length < 10) {
      console.log("[API/CART] Bypassing ERPNext call due to short mobile_no length:", sanitizedMobile.length);
      return NextResponse.json({
        message: {
          status: true,
          message: "Empty cart for guest user",
          data: []
        }
      });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!baseUrl || !apiKey || !apiSecret) {
      console.error("[API/CART] Missing system credentials in env variables");
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    console.log("[API/CART] Hitting ERPNext get_user_details with sanitized mobile:", sanitizedMobile);
    // Step 1: Fetch user details for auth keys
    const userRes = await fetch(`${baseUrl}/api/method/shoption_api.erp_api.utility.get_user_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify({ mobile_no: sanitizedMobile }),
    });

    if (!userRes.ok) {
      console.error("[API/CART] ERPNext user-details response failed with status:", userRes.status);
      return NextResponse.json({ error: 'Failed to fetch user auth keys' }, { status: userRes.status });
    }

    const userData = await userRes.json();
    console.log("[API/CART] ERPNext response data:", JSON.stringify(userData));

    if (!userData.message?.status || !userData.message?.data?.key_details) {
      console.warn("[API/CART] User auth keys not found or status false in ERPNext response");
      return NextResponse.json({ error: 'User auth keys not found' }, { status: 401 });
    }

    const userApiKey = userData.message.data.key_details.api_key;
    const userApiSecret = userData.message.data.key_details.api_secret;
    console.log("[API/CART] Successfully retrieved API Key:", userApiKey);

    // Step 2: Fetch cart details
    const cartRes = await fetch(`${baseUrl}/api/method/shoption_api.gbru_shoption.gbru_cart.get_cart?page=1&page_size=20&t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      },
      cache: 'no-store'
    });

    if (!cartRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: cartRes.status });
    }

    const cartData = await cartRes.json();
    return NextResponse.json(cartData);
  } catch (error: any) {

    return NextResponse.json({ error: 'Failed to fetch cart details', msg: error.message }, { status: 500 });
  }
}

export const POST = withEncryption(_postHandler);
