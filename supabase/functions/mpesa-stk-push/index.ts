import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// M-Pesa Credentials
const MPESA_CONSUMER_KEY = "qeyTs2HruO5R3yCNxDxqHWPSJFiD5oebzPdrdfGbbhYG1ZHB";
const MPESA_CONSUMER_SECRET = "2QnG8GrsLyZaTYBOpy3S6rUONIJiKVKWWaO3jezJzsC4Vhv2HQ3PcgRJxA97MSvb";
// Sandbox passkey (temporary) - Replace with production passkey from Safaricom after Go-Live
const MPESA_PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

const BUSINESS_SHORT_CODE = "174379";
const POCHI_NUMBER = "254758913512";
const MPESA_BASE_URL = "https://sandbox.safaricom.co.ke";

async function getMpesaAccessToken() {
  const auth = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`);
  
  const response = await fetch(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${auth}`,
    },
  });

  const data = await response.json();
  return data.access_token;
}

function generatePassword(shortCode: string, passkey: string, timestamp: string) {
  const str = shortCode + passkey + timestamp;
  return btoa(str);
}

function getTimestamp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, amount, templateId, templateName } = await req.json();

    // Validate phone number format
    let formattedPhone = phoneNumber.replace(/\s+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Get M-Pesa access token
    const accessToken = await getMpesaAccessToken();
    
    // Generate timestamp and password
    const timestamp = getTimestamp();
    const password = generatePassword(BUSINESS_SHORT_CODE, MPESA_PASSKEY, timestamp);

    // Initiate STK Push
    const stkPushResponse = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: BUSINESS_SHORT_CODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${SUPABASE_URL}/functions/v1/mpesa-callback`,
        AccountReference: `TEMPLATE_${templateId}`,
        TransactionDesc: `Purchase ${templateName}`,
      }),
    });

    const stkData = await stkPushResponse.json();

    if (stkData.ResponseCode === "0") {
      // Create purchase record in Supabase
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      
      const { data: purchase, error } = await supabase
        .from("template_purchases")
        .insert({
          template_id: templateId,
          phone_number: formattedPhone,
          amount: amount,
          mpesa_checkout_request_id: stkData.CheckoutRequestID,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating purchase record:", error);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "STK Push sent successfully. Please check your phone.",
          checkoutRequestId: stkData.CheckoutRequestID,
          purchaseId: purchase?.id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: stkData.errorMessage || "Failed to initiate payment",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "An error occurred",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});