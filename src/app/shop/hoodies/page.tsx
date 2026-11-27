import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";
import { getCategoryPageContent } from "@/lib/category-pages-server";

export const metadata = buildMetadata({
  title: "Fleece Hoodies for Men Online India | 350 GSM | StarkVibe",
  description: "Shop 350 GSM 100% cotton fleece hoodies in 5 colours. Warm, soft and double stitched. Custom printing available across India.",
  path: "/shop/hoodies",
  image: "/og-hoodies.png",
  imageAlt: "StarkVibe fleece hoodies in multiple colours",
});

export default async function HoodiesPage() {
  const content = await getCategoryPageContent("hoodies");
  return <CategoryShopPage config={categoryPages.hoodies} content={content} />;
}
