import { productFromApi, type Product } from "@/lib/catalogue";

export async function getCatalogueProducts(): Promise<Product[]> {
  const apiUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
  const isLocalPreview = process.env.NODE_ENV === "development";
  const endpoint = new URL(`${apiUrl}/products`);
  if (isLocalPreview) endpoint.searchParams.set("include_drafts", "1");

  try {
    const response = await fetch(
      endpoint,
      isLocalPreview ? { cache: "no-store" } : { next: { revalidate: 60 } },
    );
    if (!response.ok) return [];
    const body = (await response.json()) as { products?: Parameters<typeof productFromApi>[0][] };
    return body.products?.map(productFromApi) || [];
  } catch {
    return [];
  }
}
