import { NextResponse } from 'next/server';
import { createB2CLead } from '@/lib/lead';

export async function POST(request: Request) {
  try {
    const { mobile_no, otp } = await request.json();

    if (!mobile_no || !otp) {
      return NextResponse.json({ error: 'Mobile number and OTP are required' }, { status: 400 });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!baseUrl || !apiKey || !apiSecret) {
      console.error('Missing API credentials in environment variables.');
      return NextResponse.json({ error: 'Internal server error: Missing credentials' }, { status: 500 });
    }

    // 1. Verify OTP
    const verifyResponse = await fetch(`${baseUrl}/api/method/shoption_api.otp.api.verify_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify({ mobile_no, otp }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.message?.status) {
      return NextResponse.json({ 
        success: false, 
        message: verifyData.message?.message || 'Invalid or expired OTP' 
      }, { status: 400 });
    }

    // 2. Fetch User Details
    const userResponse = await fetch(`${baseUrl}/api/method/shoption_api.erp_api.utility.get_user_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
      },
      body: JSON.stringify({ mobile_no }),
    });

    const userData = await userResponse.json();
    console.log("get_user_details response:", JSON.stringify(userData));

    const status = userData.message?.status;
    const dataObj = userData.message?.data;
    
    // A user is new if:
    // 1. status is false (boolean or string)
    // 2. data is an empty array or null
    // 3. registration_completed is false
    const isNewUser = 
      status === false || 
      status === 'false' || 
      !status || 
      !dataObj || 
      (Array.isArray(dataObj) && dataObj.length === 0) ||
      dataObj.registration_completed === false;

    if (isNewUser) {
      // User not found in ERP (but OTP was verified) - redirect to short registration
      return NextResponse.json({ 
        success: true, 
        isNewUser: true,
        mobile_no,
        message: userData.message?.message || 'User not found' 
      });
    }

    // Call Lead Creation API for existing customers
    try {
      const leadName = dataObj.customer_name || dataObj.first_name || dataObj.user_id || 'Existing Customer';
      await createB2CLead(leadName, mobile_no);
    } catch (leadErr) {
      console.error('Failed to trigger B2C lead creation during OTP verify:', leadErr);
    }

    return NextResponse.json({
      success: true,
      user: userData.message.data,
      ispopup: userData.message.ispopup
    });
  } catch (error) {
    console.error('Error verifying OTP or fetching user:', error);
    return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 });
  }
}
