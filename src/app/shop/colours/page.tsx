import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";

export const metadata: Metadata = {
  title: "Shop by Colour — StarkVibe",
  description: "Browse StarkVibe cotton clothing in a considered range of everyday and statement colours.",
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
