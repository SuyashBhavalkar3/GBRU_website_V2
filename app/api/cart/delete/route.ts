import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mobile_no, item } = await request.json();

    if (!mobile_no || !item) {
      return NextResponse.json({ error: 'Mobile number and item are required' }, { status: 400 });
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

    // Step 2: Send DELETE request to delete_cart_item API
    const deleteRes = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.delete_cart_item`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      },
      body: JSON.stringify({ item }),
    });

    console.log("delete_cart_item fetch status:", deleteRes.status);
    if (!deleteRes.ok) {
      const errText = await deleteRes.text();
      console.error("delete_cart_item failed:", errText);
      return NextResponse.json({ error: 'Failed to delete cart item', details: errText }, { status: deleteRes.status });
    }

    const deleteData = await deleteRes.json();
    console.log("delete_cart_item success data:", deleteData);
    return NextResponse.json(deleteData);
  } catch (error: any) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ error: 'Failed to delete cart item', msg: error.message }, { status: 500 });
  }
}
