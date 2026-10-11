import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";

export const metadata: Metadata = {
  title: "Shop by Fabric Weight — StarkVibe",
  description: "Explore StarkVibe cotton clothing by fabric weight, from light 180 GSM tees to warm 350 GSM fleece.",
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
