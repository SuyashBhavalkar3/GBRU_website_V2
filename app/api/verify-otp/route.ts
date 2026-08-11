import { withEncryption } from "@/utils/withEncryption";
import { NextResponse } from 'next/server';
import { createB2CLead } from '@/lib/lead';

async function _postHandler(request: Request) {
  try {
    const { mobile_no, otp } = await request.json();

    if (!mobile_no || !otp) {
      return NextResponse.json({ error: 'Mobile number and OTP are required' }, { status: 400 });
    }

    const baseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (!baseUrl || !apiKey || !apiSecret) {
      
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
    

    const status = userData.message?.status;
    const dataObj = userData.message?.data;

    // A user is new only if the ERP response explicitly says no user exists.
    // If status is true and data is an object, treat it as an existing user,
    // even when registration_completed is false.
    const isNewUser =
      status === false ||
      status === 'false' ||
      dataObj === null ||
      dataObj === undefined ||
      (Array.isArray(dataObj) && dataObj.length === 0);

    if (isNewUser) {
      return NextResponse.json({
        success: true,
        isNewUser: true,
        mobile_no,
        message: userData.message?.message || 'User not found'
      });
    }

    // Set lead ID: use existing lead from verify_otp response if present, otherwise call Lead Creation API
    const existingLead = verifyData.message?.lead;
    if (existingLead && existingLead.trim() !== "") {
      dataObj.lead_id = existingLead;
    } else {
      try {
        const leadName = dataObj.customer_name || dataObj.Customer_name || dataObj.full_name || dataObj.first_name || 'Customer';
        const leadResult = await createB2CLead(leadName, mobile_no);
        if (leadResult.success && leadResult.data) {
          const leadId = leadResult.data.message?.name || leadResult.data.message?.lead || leadResult.data.name;
          if (leadId) {
            dataObj.lead_id = leadId;
          }
        }
      } catch (leadErr) {
        
      }
    }

    return NextResponse.json({
      success: true,
      user: userData.message.data,
      ispopup: userData.message.ispopup
    });
  } catch (error) {
    
    return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 });
  }
}

export const POST = withEncryption(_postHandler);
