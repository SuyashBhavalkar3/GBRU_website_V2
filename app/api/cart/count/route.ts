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

    // Step 2: Fetch cart count details
    const countRes = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.get_cart_count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      }
    });

    if (!countRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch cart count' }, { status: countRes.status });
    }

    const countData = await countRes.json();
    return NextResponse.json(countData);
  } catch (error: any) {
    
    return NextResponse.json({ error: 'Failed to fetch cart count', msg: error.message }, { status: 500 });
  }
}
