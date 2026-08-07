import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mobile_no, name } = await request.json();

    const baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!apiKey || !apiSecret) {
      console.error('Missing API credentials in environment variables.');
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    const payload = {
      mobile_no,
      name,
      role: "Farmer"
    };

    const response = await fetch(`${baseUrl}/api/method/shoption_api.otp.api.lead_create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response:", responseText);
      return NextResponse.json({ error: 'Invalid response from server' }, { status: 500 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Error in lead creation:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
