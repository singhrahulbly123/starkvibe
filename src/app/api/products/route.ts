import { NextResponse } from "next/server";

export async function GET() {
  const defaultApiUrl = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api" : "https://api.starkvibe.com/api";
  const apiUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || defaultApiUrl).replace(/\/$/, "");
  const isLocalPreview = process.env.NODE_ENV === "development";
  const endpoint = new URL(`${apiUrl}/products`);
  if (isLocalPreview) endpoint.searchParams.set("include_drafts", "1");

  try {
    const response = await fetch(
      endpoint,
      isLocalPreview ? { cache: "no-store" } : { next: { revalidate: 60 } },
    );
    const body = await response.json();
    if (!response.ok) return NextResponse.json({ products: [] }, { status: response.status });
    return NextResponse.json(body, {
      headers: isLocalPreview
        ? { "Cache-Control": "no-store" }
        : { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ products: [] }, { status: 503 });
  }
}
