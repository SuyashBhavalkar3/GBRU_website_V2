import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const systemApiKey = process.env.API_KEY;
    const systemApiSecret = process.env.API_SECRET;

    if (!baseUrl || !systemApiKey || !systemApiSecret) {
      console.error('Missing API credentials or base URL in environment variables.');
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/api/method/shoption_api.gbru_shoption.item_api.get_gbru_featured_products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': systemApiKey,
        'X-API-SECRET': systemApiSecret,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch featured products' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json({ error: 'Failed to fetch featured products', msg: error.message }, { status: 500 });
  }
}
