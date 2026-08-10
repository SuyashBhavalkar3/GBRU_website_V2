import { withEncryption } from "@/utils/withEncryption";
import { NextResponse } from 'next/server';

async function _postHandler(request: Request) {
  try {
    const formData = await request.formData();

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!baseUrl || !apiKey || !apiSecret) {
      
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/api/method/shoption_api.erp_api.utility.upload_image`, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export const POST = withEncryption(_postHandler);
