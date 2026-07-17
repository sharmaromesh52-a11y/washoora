import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const localVerifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode && token) {
    if (mode === "subscribe" && token === localVerifyToken) {
      console.log("⚡ WHATSAPP_WEBHOOK_VERIFIED");
      return new NextResponse(challenge, { status: 200 });
    }
    return new NextResponse("Forbidden", { status: 403 });
  }
  return new NextResponse("Bad Request", { status: 400 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.object && body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const messageData = body.entry[0].changes[0].value.messages[0];
      const customerPhone = messageData.from;
      const customerMessage = messageData.text?.body;

      if (customerMessage) {
        console.log(`📩 Message from ${customerPhone}: ${customerMessage}`);

        // 🚀 Forwarding message to our local chat engine
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
        console.log(`🤖 AI Response: ${chatData.reply}`);
        
        // Next step me hum Meta API key daalkar is reply ko real WhatsApp par return karenge!
      }
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}