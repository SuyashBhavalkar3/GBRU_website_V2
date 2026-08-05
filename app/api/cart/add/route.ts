import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mobile_no, items } = await request.json();

    if (!mobile_no || !items) {
      return NextResponse.json({ error: 'Mobile number and items are required' }, { status: 400 });
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

    // Step 2: Post to add_cart API
    const addRes = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.add_cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      },
      body: JSON.stringify({ items }),
    });

    if (!addRes.ok) {
      return NextResponse.json({ error: 'Failed to add items to cart' }, { status: addRes.status });
    }

    const addData = await addRes.json();
    return NextResponse.json(addData);
  } catch (error: any) {
    console.error('Error adding items to cart:', error);
    return NextResponse.json({ error: 'Failed to add items to cart', msg: error.message }, { status: 500 });
  }
}
