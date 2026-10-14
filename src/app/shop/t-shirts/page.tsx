import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cotton T-Shirts | 180–240 GSM Tees | StarkVibe",
  description: "Shop 100% cotton T-shirts from 180 to 240 GSM, with double bio-wash, silicon wash and double stitching across regular and oversized fits. Compare colours.",
  path: "/shop/t-shirts",
});

export default function TShirtsPage() {
  return <CategoryShopPage config={categoryPages.tshirts} />;
}
