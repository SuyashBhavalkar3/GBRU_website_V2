import 'server-only';

export async function createB2CLead(leadName: string, mobileNo: string) {
  try {
    const baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const campaignName = process.env.CAMPAIGN_NAME;

    if (!baseUrl || !apiKey || !apiSecret) {
      
      return { success: false, message: 'Missing API credentials' };
    }

    if (!campaignName) {
      
      return { success: false, message: 'Missing CAMPAIGN_NAME' };
    }

    

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
      
      return { success: false, status: res.status, message: errorText };
    }

    const data = await res.json();
    
    return { success: true, data };
  } catch (error: any) {
    
    return { success: false, error: error.message };
  }
}
