import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { categoryMetaDescription, categoryMetaTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: categoryMetaTitle("Cotton Clothing by GSM"),
  description: categoryMetaDescription("cotton clothing by GSM"),
  alternates: { canonical: "/shop/weight" },
};

export default function ShopByWeightPage() {
  return (
    <>
      <Storefront hideRange>
        <main><ShopCatalogue /></main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
