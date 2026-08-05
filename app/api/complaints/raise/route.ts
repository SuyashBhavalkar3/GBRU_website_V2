import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const incomingFormData = await request.formData();
    const mobile_no = incomingFormData.get("mobile_no")?.toString();

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

    // Step 2: Build outgoing form data for ERP
    const erpFormData = new FormData();
    erpFormData.append("complaint_type", incomingFormData.get("complaint_type") || "");
    
    const orderId = incomingFormData.get("order") || incomingFormData.get("order_id");
    if (orderId) {
      erpFormData.append("order_id", orderId.toString());
    }
    
    erpFormData.append("subject", incomingFormData.get("subject") || "");
    erpFormData.append("description", incomingFormData.get("description") || "");

    const file = incomingFormData.get("attachment_1");
    if (file && file instanceof File) {
      // Append the file field
      erpFormData.append("attachment_1", file, file.name);
    }

    // Step 3: Post the complaint to ERP using user authorization keys
    console.log("Raising complaint with fields:");
    console.log("complaint_type:", erpFormData.get("complaint_type"));
    console.log("order_id:", erpFormData.get("order_id"));
    console.log("subject:", erpFormData.get("subject"));
    console.log("description:", erpFormData.get("description"));
    console.log("attachment:", file ? (file as File).name : "none");

    const response = await fetch(`${baseUrl}/api/method/shoption_api.cart.cart.raise_complaint`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${userApiKey}:${userApiSecret}`,
      },
      body: erpFormData,
    });

    const data = await response.json();
    console.log("ERP raise_complaint response:", JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error raising complaint:', error);
    return NextResponse.json({ error: 'An error occurred while submitting your complaint' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
