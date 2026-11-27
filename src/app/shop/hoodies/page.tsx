import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";
import { getCategoryPageContent } from "@/lib/category-pages-server";

export const metadata = buildMetadata({
  title: "350 GSM Cotton Fleece Hoodies | StarkVibe",
  description: "Shop the 350 GSM 100% cotton fleece hoodie from StarkVibe for warmth and streetwear styling, with double bio-wash, silicon wash and double stitching. Colours.",
  path: "/shop/hoodies",
});

export default async function HoodiesPage() {
  const content = await getCategoryPageContent("hoodies");
  return <CategoryShopPage config={categoryPages.hoodies} content={content} />;
}
