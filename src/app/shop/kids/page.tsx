import { CategoryShopPage } from "@/components/category-shop-page";
import { categoryPages } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kids Cotton T-Shirts | 180 GSM | StarkVibe",
  description: "Shop the 100% cotton 180 GSM kids T-shirt from StarkVibe, with a soft flexible feel, double bio-wash, silicon wash and double stitching. Compare colours online.",
  path: "/shop/kids",
});

export default function KidsPage() {
  return <CategoryShopPage config={categoryPages.kids} />;
}
