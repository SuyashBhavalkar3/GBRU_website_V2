import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let mobile_no = "";

    try {
      const body = await request.json();
      mobile_no = body.mobile_no || "";
    } catch (e) {
      
    }

    if (!mobile_no) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!baseUrl || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Missing ERP API configuration' }, { status: 500 });
    }

    // Step 1: Fetch user keys
    const userDetailsRes = await fetch(`${baseUrl}/api/method/shoption_api.erp_api.utility.get_user_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify({ mobile_no }),
    });

    const userDetailsData = await userDetailsRes.json();
    if (!userDetailsData?.message?.status || !userDetailsData?.message?.data?.key_details) {
      return NextResponse.json({ error: 'Failed to retrieve user key details' }, { status: 400 });
    }

    const userApiKey = userDetailsData.message.data.key_details.api_key;
    const userApiSecret = userDetailsData.message.data.key_details.api_secret;

    // Step 2: Fetch complaint masters using the user's keys
    const response = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.get_complaint_masters`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    
    return NextResponse.json({ error: 'An error occurred while fetching complaint masters' }, { status: 500 });
  }
}
