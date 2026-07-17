import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Standard Client Setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const { message, customerPhone, chatHistory } = await req.json();

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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...(chatHistory || []),
          { role: "user", content: message }
        ],
      }),
    });

    const aiData = await response.json();
    const aiReply = aiData.choices ? aiData.choices[0].message.content : "Sorry, connectivity issue.";

    if (aiReply.includes("BOOKING_FINALIZED")) {
      await supabase.from("bookings").insert([
        {
          customer_name: "WhatsApp Lead",
          phone: customerPhone,
          vehicle_type: "Detected by AI",
          service: "Interior/Exterior Package",
          address: `AI Context: ${message}`,
          status: "Pending",
          booking_date: new Date().toISOString().split("T")[0],
        }
      ]);
    }

    return NextResponse.json({ reply: aiReply.replace("BOOKING_FINALIZED", "") });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}