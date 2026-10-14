import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { CartPageContent } from "@/components/cart-page-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: "Your Bag — StarkVibe",
  description:
    "Review your StarkVibe pieces, update quantities and request order confirmation or custom printing before you complete your order. No payment is taken yet.",
  path: "/cart",
  }),
  robots: { index: false, follow: false },
};
export default function CartPage() {
  return (
    <>
      <a
        href="#cart-items"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:p-4"
      >
        Skip to bag items
      </a>
      <div className="flex flex-wrap justify-between gap-2 bg-ink px-5 py-[11px] text-[13px] text-paper lg:px-12">
        <span>
          Custom printing and bulk enquiries —{" "}
          <a href="/#custom" className="font-semibold text-gold">
            Get in touch
          </a>
        </span>
        <span className="text-[#b9b7ae]">Sale prices from ₹800</span>
      </div>
      <Storefront hideRange>
        <main>
          <CartPageContent />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
