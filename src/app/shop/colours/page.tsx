import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { categoryMetaDescription, categoryMetaKeywords, categoryMetaTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: categoryMetaTitle("Cotton Clothing by Colour"),
  description: categoryMetaDescription("cotton clothing by colour"),
  keywords: categoryMetaKeywords("cotton clothing by colour"),
  alternates: { canonical: "/shop/colours" },
};

export default function ShopByColourPage() {
  return (
    <>
      <Storefront hideRange>
        <main><ShopCatalogue /></main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
