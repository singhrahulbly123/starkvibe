import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api";
  try {
    const response = await fetch(apiUrl + "/products", { next: { revalidate: 60 } });
    const body = await response.json();
    if (!response.ok) return NextResponse.json({ products: [] }, { status: response.status });
    return NextResponse.json(body, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json({ products: [] }, { status: 503 });
  }
}
