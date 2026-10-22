import { createHmac } from "node:crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ message: "Razorpay is not configured on the server." }, { status: 503 });
  }

  try {
    const body = (await request.json().catch(() => null)) as { amount?: unknown; receipt?: unknown } | null;
    if (!body) {
      return NextResponse.json({ message: "A valid order request is required." }, { status: 400 });
    }
    const amount = body.amount;
    const receipt = typeof body.receipt === "string" ? body.receipt : `sv_${Date.now()}`;
    if (typeof amount !== "number" || !Number.isSafeInteger(amount) || amount < 100) {
      return NextResponse.json({ message: "Order amount must be at least 100 paise." }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({ amount, currency: "INR", receipt: receipt.slice(0, 40) });
    const verification_token = createHmac("sha256", keySecret).update(`${order.id}|${order.amount}|${order.currency}`).digest("hex");
    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency, verification_token });
  } catch (error) {
    const status = (error as { statusCode?: number })?.statusCode;
    if (status === 401) {
      return NextResponse.json({ message: "Razorpay rejected the server credentials." }, { status: 401 });
    }
    return NextResponse.json({ message: "Unable to create a Razorpay order. Please try again." }, { status: 500 });
  }
}
