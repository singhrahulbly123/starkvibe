import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ message: "Razorpay is not configured on the server." }, { status: 503 });
  }

  try {
    const body = (await request.json().catch(() => null)) as {
      razorpay_order_id?: unknown;
      razorpay_payment_id?: unknown;
      razorpay_signature?: unknown;
      amount?: unknown;
      currency?: unknown;
      verification_token?: unknown;
    } | null;
    if (!body) {
      return NextResponse.json({ message: "A valid payment verification request is required." }, { status: 400 });
    }
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, amount, currency, verification_token: verificationToken } = body;
    if (typeof orderId !== "string" || !orderId || typeof paymentId !== "string" || !paymentId || typeof signature !== "string" || !signature || typeof amount !== "number" || !Number.isSafeInteger(amount) || typeof currency !== "string" || typeof verificationToken !== "string") {
      return NextResponse.json({ message: "Payment verification fields are required." }, { status: 400 });
    }

    const expectedOrderToken = createHmac("sha256", keySecret).update(`${orderId}|${amount}|${currency}`).digest();
    const receivedOrderToken = Buffer.from(verificationToken, "hex");
    if (receivedOrderToken.length !== expectedOrderToken.length || !timingSafeEqual(receivedOrderToken, expectedOrderToken)) {
      return NextResponse.json({ message: "Razorpay order could not be verified." }, { status: 400 });
    }

    const expected = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest();
    const received = Buffer.from(signature, "hex");
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
      return NextResponse.json({ message: "Payment signature could not be verified." }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ message: "Payment verification request is invalid." }, { status: 400 });
  }
}
