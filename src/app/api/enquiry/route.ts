import { NextResponse } from "next/server";

const recipient = "info@starkvibe.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const subject = String(payload.subject || "New StarkVibe enquiry");
    const message = String(payload.message || "");
    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _captcha: "false",
        _template: "table",
        message,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to send enquiry" }, { status: 500 });
  }
}
