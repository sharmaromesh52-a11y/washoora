import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Twilio data standard Form-URL-Encoded format me bhejta hai
    const formData = await req.formData();
    
    // Customer ka number aur message nikalte hain
    const customerPhone = formData.get("From")?.toString().replace("whatsapp:", "") || "";
    const customerMessage = formData.get("Body")?.toString() || "";

    if (customerMessage && customerPhone) {
      console.log(`📩 [Twilio] Message from ${customerPhone}: ${customerMessage}`);

      // 🚀 Forwarding text to our local AI Engine
      const currentUrl = new URL(req.url);
      const chatUrl = `${currentUrl.origin}/api/chat`;

      const chatResponse = await fetch(chatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: customerMessage,
          customerPhone: customerPhone,
          chatHistory: []
        })
      });

      const chatData = await chatResponse.json();
      console.log(`🤖 AI Generated Reply: ${chatData.reply}`);

      // Twilio Response XML Format return karte hain taaki WhatsApp par reply automatic chala jaye
      const twilioXmlResponse = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${chatData.reply}</Message></Response>`;
      
      return new NextResponse(twilioXmlResponse, {
        headers: { "Content-Type": "text/xml" },
        status: 200,
      });
    }

    return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" }, status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return new NextResponse(`<Response><Message>Error: ${error.message}</Message></Response>`, { headers: { "Content-Type": "text/xml" }, status: 500 });
  }
}