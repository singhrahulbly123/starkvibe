import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "350 GSM Cotton Fleece Sweatshirts | StarkVibe",
  description: "Shop the 350 GSM 100% cotton fleece sweatshirt from StarkVibe, made for warmth, softness and durability with double bio-wash and silicon wash. Shop colours.",
  path: "/shop/sweatshirts",
});

export default function SweatshirtsPage() {
  return <CategoryShopPage config={categoryPages.sweatshirts} />;
}
