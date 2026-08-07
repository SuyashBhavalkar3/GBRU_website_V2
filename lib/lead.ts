import 'server-only';

export async function createB2CLead(leadName: string, mobileNo: string) {
  try {
    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const campaignName = process.env.CAMPAIGN_NAME;

    if (!baseUrl || !apiKey || !apiSecret) {
      console.error('Lead Creation: Missing API credentials or base URL in environment.');
      return { success: false, message: 'Missing API credentials' };
    }

    if (!campaignName) {
      console.error('Lead Creation: CAMPAIGN_NAME is required in env but was not found.');
      return { success: false, message: 'Missing CAMPAIGN_NAME' };
    }

    console.log(`Lead Creation: Sending lead for "${leadName}" (${mobileNo}) under campaign "${campaignName}"`);

    const res = await fetch(`${baseUrl}/api/method/warrior.apis.lead.add_b2c_auto_lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify({
        lead_name: leadName,
        mobile_no: mobileNo,
        campaign_name: campaignName,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Lead Creation: API call failed with status ${res.status}:`, errorText);
      return { success: false, status: res.status, message: errorText };
    }

    const data = await res.json();
    console.log('Lead Creation: API Response:', JSON.stringify(data));
    return { success: true, data };
  } catch (error: any) {
    console.error('Lead Creation: Unexpected error occurred:', error);
    return { success: false, error: error.message };
  }
}
