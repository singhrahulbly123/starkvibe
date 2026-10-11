import type { Metadata } from "next";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";

export const metadata: Metadata = {
  title: "Shop Cotton Fabric — StarkVibe",
  description: "Find premium cotton tees, polos, kidswear and fleece garments made for everyday comfort and custom printing.",
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
