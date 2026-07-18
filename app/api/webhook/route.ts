import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    // Twilio form data parsing
    const formData = await req.formData();
    const customerPhone = formData.get("From")?.toString().replace("whatsapp:", "") || "";
    const customerMessage = formData.get("Body")?.toString() || "";

    if (!customerMessage || !customerPhone) {
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" }, status: 200 });
    }

    console.log(`📩 [Twilio] Message from ${customerPhone}: ${customerMessage}`);

    if (!OPENAI_API_KEY) {
      console.error("❌ Missing OPENAI_API_KEY Environment Variable in Vercel!");
      const noKeyXml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Washoora Service Configuration Error: Missing API Key.</Message></Response>`;
      return new NextResponse(noKeyXml, { headers: { "Content-Type": "text/xml" }, status: 200 });
    }

    const systemPrompt = `
      You are "Washoora AI", the premium luxury auto-detailing receptionist in Jhunjhunu.
      Talk to customers in friendly conversational Hindi (Roman script/Hinglish, e.g., "Namaste! Washoora me swagat hai").
      
      BUSINESS RULES:
      1. Exterior Wash is ₹199, Interior Detailing is ₹349, Bike/Scooty Wash is ₹79. 
      2. Step-by-Step Goal:
         a. Ask for the vehicle model (e.g., Swift, Splendor).
         b. Suggest the best package and state the exact price.
         c. Ask for the service address in Jhunjhunu.
         d. Confirm the preferred time slot.
      3. CRITICAL: Once all data is provided, respond with "BOOKING_FINALIZED" followed by a confirmation summary.
    `;

    // Direct OpenAI API Call (No internal sub-route fetch)
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: customerMessage }
        ],
      }),
    });

    const aiData = await openAiResponse.json();
    
    if (!openAiResponse.ok || !aiData.choices) {
      console.error("OpenAI API Error Details:", JSON.stringify(aiData));
      throw new Error(aiData.error?.message || "OpenAI Response Failure");
    }

    let aiReply = aiData.choices[0].message.content || "Ji batayein, kaise madad karu?";

    // Database operation if booking completed
    if (aiReply.includes("BOOKING_FINALIZED")) {
      aiReply = aiReply.replace("BOOKING_FINALIZED", "");
      await supabase.from("bookings").insert([
        {
          customer_name: "WhatsApp Lead",
          phone: customerPhone,
          vehicle_type: "Detected by AI",
          service: "Interior/Exterior Package",
          address: `AI Context: ${customerMessage}`,
          status: "Pending",
          booking_date: new Date().toISOString().split("T")[0],
        }
      ]);
    }

    // Twilio Response Format
    const twilioXmlResponse = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${aiReply}</Message></Response>`;
    
    return new NextResponse(twilioXmlResponse, {
      headers: { "Content-Type": "text/xml" },
      status: 200,
    });

  } catch (error: any) {
    console.error("🚨 Webhook Crash Error:", error.message);
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Washoora Home Service AI: ${error.message}</Message></Response>`;
    return new NextResponse(errorXml, { headers: { "Content-Type": "text/xml" }, status: 200 });
  }
}