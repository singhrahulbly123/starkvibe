import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { categoryMetaDescription, categoryMetaTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: categoryMetaTitle("Cotton Fabric Clothing"),
  description: categoryMetaDescription("cotton fabric clothing"),
  alternates: { canonical: "/shop/fabric" },
};

export default function ShopByFabricPage() {
  return (
    <>
      <Storefront hideRange>
        <main><ShopCatalogue /></main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
