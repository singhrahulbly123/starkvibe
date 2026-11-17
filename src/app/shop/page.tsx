import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { buildMetadata, categoryMetaDescription, categoryMetaTitle } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  ...buildMetadata({
  title: categoryMetaTitle("Cotton Clothing Collection"),
  description: categoryMetaDescription("cotton clothing"),
  path: "/shop",
  }),
};
export default function ShopPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <a
        href="#shop-products"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:p-4"
      >
        Skip to products
      </a>
      <div className="flex flex-wrap justify-between gap-2 bg-ink px-5 py-[11px] text-[13px] text-paper lg:px-12">
        <span>
          Custom printing and bulk enquiries —{" "}
          <a href="/custom-printing" className="font-semibold text-gold">
            Get in touch
          </a>
        </span>
        <span className="text-[#b9b7ae]">Sale prices from ₹745</span>
      </div>
      <Storefront hideRange>
        <main>
          <ShopCatalogue
            introTitle="A practical cotton range, made to compare"
            introParagraphs={[
              "StarkVibe brings seven everyday clothing options into one clear cotton collection, from light 180 GSM tees to substantial 350 GSM fleece. Each piece is designed for repeat wear, with a focus on comfortable fabric, clean construction and simple styling. Use the filters to compare fabric weight, category, colour and price before you choose a product.",
              "Start with the occasion and climate. A regular-fit tee is an easy base for daily wear, while an oversized tee gives a more relaxed streetwear shape. Polos add a sharper finish for teams and office events, and kids tees work well for active groups and birthday clothing. When the weather turns cooler, fleece sweatshirts and hoodies add warmth without losing the option of custom printing.",
              "Every product can be reviewed by colour and size before you send an enquiry. For custom orders, share your artwork, quantity, size breakdown and required date so the team can confirm availability and the best fit for your group.",
            ]}
          />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
