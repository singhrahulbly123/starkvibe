import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";
import { getCategoryPageContent } from "@/lib/category-pages-server";

export const metadata = buildMetadata({
  title: "Fleece Sweatshirts Online India | 350 GSM Cotton | StarkVibe",
  description: "Shop 350 GSM 100% cotton fleece crewneck sweatshirts in 5 colours. Warm, soft and double stitched. Custom printing available across India.",
  path: "/shop/sweatshirts",
});

export default async function SweatshirtsPage() {
  const content = await getCategoryPageContent("sweatshirts");
  return <CategoryShopPage config={categoryPages.sweatshirts} content={content} />;
}
