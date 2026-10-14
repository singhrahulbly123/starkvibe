import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cotton Polo T-Shirts | 220 GSM Matty | StarkVibe",
  description: "Shop the 100% cotton 220 GSM Matty polo from StarkVibe, finished with double bio-wash, silicon wash and double stitching for daily wear. Shop by colour.",
  path: "/shop/polos",
});

export default function PolosPage() {
  return <CategoryShopPage config={categoryPages.polos} />;
}
