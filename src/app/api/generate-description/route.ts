import { NextResponse } from "next/server";
import { generateProductDescription } from "@/lib/product-description";

export const runtime = "nodejs";

type RequestBody = {
  name?: unknown;
  fabric?: unknown;
  gsm?: unknown;
  features?: unknown;
  colours?: unknown;
  audience?: unknown;
  useCases?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const expectedToken = process.env.CONTENT_GENERATOR_TOKEN;
  if (!expectedToken) {
    return NextResponse.json({ error: "Content generator is not configured" }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as RequestBody;
    const name = text(body.name, 120);
    const fabric = text(body.fabric, 120);
    const gsm = typeof body.gsm === "number" ? body.gsm : Number(body.gsm);
    const features = Array.isArray(body.features) ? body.features.filter((value): value is string => typeof value === "string").slice(0, 12) : [];
    if (!name || !fabric || !Number.isFinite(gsm) || gsm <= 0 || features.length === 0) {
      return NextResponse.json({ error: "name, fabric, gsm and at least one feature are required" }, { status: 400 });
    }

    const generated = await generateProductDescription({
      name,
      fabric,
      gsm,
      features,
      colours: Array.isArray(body.colours) ? body.colours.filter((value): value is string => typeof value === "string") : [],
      audience: text(body.audience, 120),
      useCases: Array.isArray(body.useCases) ? body.useCases.filter((value): value is string => typeof value === "string") : [],
    });
    return NextResponse.json(generated);
  } catch (error) {
    console.error("Product description generation failed", error);
    return NextResponse.json({ error: "Unable to generate product description" }, { status: 502 });
  }
}
