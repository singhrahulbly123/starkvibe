import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { ShopCatalogue } from "@/components/shop-catalogue";

export const metadata: Metadata = {
  title: "Shop the Range — StarkVibe",
  description:
    "Seven pieces. 100% cotton. Shop StarkVibe tees, polos, kids wear and fleece by fabric weight, colour and price.",
};
export default function ShopPage() {
  return (
    <>
      <a
        href="#shop-products"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:p-4"
      >
        Skip to products
      </a>
      <div className="flex flex-wrap justify-between gap-2 bg-ink px-5 py-[11px] text-[13px] text-paper lg:px-12">
        <span>
          Custom printing and bulk enquiries —{" "}
          <a href="/#custom" className="font-semibold text-gold">
            Get in touch
          </a>
        </span>
        <span className="text-[#b9b7ae]">Sale prices from ₹745</span>
      </div>
      <Storefront hideRange>
        <main>
          <ShopCatalogue />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
