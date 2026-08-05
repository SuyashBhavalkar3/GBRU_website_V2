import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mobile_no, from_date, to_date, page_size, page } = await request.json();

    if (!mobile_no) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const systemApiKey = process.env.API_KEY;
    const systemApiSecret = process.env.API_SECRET;

    if (!baseUrl || !systemApiKey || !systemApiSecret) {
      console.error('Missing API credentials or base URL in environment variables.');
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    // Step 1: Fetch user details server-side to get user's API keys securely
    const userDetailsRes = await fetch(`${baseUrl}/api/method/shoption_api.erp_api.utility.get_user_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': systemApiKey,
        'X-API-SECRET': systemApiSecret,
      },
      body: JSON.stringify({ mobile_no }),
    });

    const userDetailsData = await userDetailsRes.json();
    console.log("userDetailsData: ", JSON.stringify(userDetailsData, null, 2));
    
    if (!userDetailsData?.message?.status || !userDetailsData?.message?.data?.key_details) {
      console.error("Failed to retrieve user key details", userDetailsData);
      return NextResponse.json({ error: 'Failed to retrieve user key details', details: userDetailsData }, { status: 400 });
    }

    const userApiKey = userDetailsData.message.data.key_details.api_key;
    const userApiSecret = userDetailsData.message.data.key_details.api_secret;

    // Step 2: Fetch orders using the user's keys
    const params = new URLSearchParams({
      from_date: from_date || "2026-04-01",
      to_date: to_date || "2028-05-31",
      page_size: String(page_size || 200),
      page: String(page || 1)
    });

    const response = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.get_order_from_list?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      },
    });

    const data = await response.json();
    console.log("ordersData: ", JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders', msg: error.message }, { status: 500 });
  }
}
