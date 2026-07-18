import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const customerPhone = formData.get("From")?.toString().replace("whatsapp:", "") || "";
    const customerMessage = formData.get("Body")?.toString() || "";

    if (customerMessage && customerPhone) {
      console.log(`📩 [Twilio] Message from ${customerPhone}: ${customerMessage}`);

      const currentUrl = new URL(req.url);
      const chatUrl = `${currentUrl.origin}/api/chat`;

      // Kuch platform local fetch block karte hain, isliye headers me Host pass karna zaroori hai
      const chatResponse = await fetch(chatUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Host": currentUrl.host 
        },
        body: JSON.stringify({
          message: customerMessage,
          customerPhone: customerPhone,
          chatHistory: []
        })
      });

      if (!chatResponse.ok) {
        throw new Error(`Chat API responded with status ${chatResponse.status}`);
      }

      const chatData = await chatResponse.json();
      console.log(`🤖 AI Generated Reply: ${chatData.reply}`);

      // Twilio Messaging XML TwiML Response
      const twilioXmlResponse = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${chatData.reply || 'Hi! How can I help you today?'}</Message></Response>`;
      
      return new NextResponse(twilioXmlResponse, {
        headers: { "Content-Type": "text/xml" },
        status: 200,
      });
    }

    return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" }, status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    // Fallback automated response taaki user ko error direct screen par na dikhe
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Washoora Service temporarily busy. Please try again!</Message></Response>`;
    return new NextResponse(errorXml, { headers: { "Content-Type": "text/xml" }, status: 200 }); // Status 200 return karein taaki Twilio connectivity issue na bolne lage
  }
}