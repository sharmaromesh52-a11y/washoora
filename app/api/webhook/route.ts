import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase Setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const customerPhone = formData.get("From")?.toString().replace("whatsapp:", "") || "";
    const customerMessage = formData.get("Body")?.toString() || "";

    if (!customerMessage || !customerPhone) {
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" }, status: 200 });
    }

    if (!GROQ_API_KEY) {
      console.error("❌ Missing GROQ_API_KEY!");
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" }, status: 200 });
    }

    // 1. 🔄 Fetch Recent Chat History from Supabase (Last 10 messages)
    const { data: historyData } = await supabase
      .from("chat_logs")
      .select("role, content")
      .eq("phone", customerPhone)
      .order("created_at", { ascending: true })
      .limit(10);

    const formattedHistory = (historyData || []).map((msg) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

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
      3. CRITICAL: Once all data (Vehicle, Address, Slot) is provided, respond STRICTLY in this format:
         BOOKING_FINALIZED
         Vehicle: [Vehicle Name]
         Service: [Service Type]
         Address: [Full Address]
         Slot: [Time/Day]
         Summary: [Friendly confirmation message to the customer]
    `;

    // 2. 🚀 Send to Groq with History
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY.trim()}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...formattedHistory,
          { role: "user", content: customerMessage }
        ],
      }),
    });

    const aiData = await groqResponse.json();
    if (!groqResponse.ok) throw new Error(aiData.error?.message || "Groq Failure");

    let aiReply = aiData.choices[0].message.content || "";
    let userReplyText = aiReply;

    // 3. 💾 Save User Message to History Table
    await supabase.from("chat_logs").insert([
      { phone: customerPhone, role: "user", content: customerMessage },
    ]);

    // 4. 🗃️ Process Finalized Booking Smartly
    if (aiReply.includes("BOOKING_FINALIZED")) {
      // Parse the structured text from AI (Adding explicit string types for TypeScript)
      const lines = aiReply.split("\n");
      const vehicle = lines.find((l: string) => l.startsWith("Vehicle:"))?.replace("Vehicle:", "").trim() || "Detected by AI";
      const service = lines.find((l: string) => l.startsWith("Service:"))?.replace("Service:", "").trim() || "Auto Detailing";
      const address = lines.find((l: string) => l.startsWith("Address:"))?.replace("Address:", "").trim() || "Jhunjhunu";
      const slot = lines.find((l: string) => l.startsWith("Slot:"))?.replace("Slot:", "").trim() || "Standard Time";
      const summary = lines.find((l: string) => l.startsWith("Summary:"))?.replace("Summary:", "").trim() || "Aapki booking confirm ho gayi hai!";

      userReplyText = summary; // Send only the clean summary to customer WhatsApp

      // Insert clean structured data to bookings table
      await supabase.from("bookings").insert([
        {
          customer_name: "WhatsApp Lead",
          phone: customerPhone,
          vehicle_type: vehicle,
          service: service,
          address: `${address} (Slot: ${slot})`,
          status: "Pending",
          booking_date: new Date().toISOString().split("T")[0],
        }
      ]);
    }

    // 💾 Save AI Reply to History Table
    await supabase.from("chat_logs").insert([
      { phone: customerPhone, role: "assistant", content: userReplyText },
    ]);

    // Send back clean text via Twilio
    const twilioXmlResponse = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${userReplyText.trim()}</Message></Response>`;
    return new NextResponse(twilioXmlResponse, { headers: { "Content-Type": "text/xml" }, status: 200 });

  } catch (error: any) {
    console.error("🚨 Webhook Crash Error:", error.message);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Washoora AI: Thoda samay lag raha hai, kripya dobara likhein.</Message></Response>`, 
      { headers: { "Content-Type": "text/xml" }, status: 200 }
    );
  }
}