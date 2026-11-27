import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/structured-data";
import type { ShopFilters } from "@/lib/shop";
import type { CategoryPageContent } from "@/lib/category-pages-server";

export type CategoryShopConfig = {
  path: string;
  label: string;
  heading: string;
  category: ShopFilters["category"];
  productIds: string[];
  introTitle: string;
  introParagraphs: string[];
};

export function CategoryShopPage({ config, content }: { config: CategoryShopConfig; content?: CategoryPageContent | null }) {
  const heading = content?.heading || config.heading;
  const introTitle = content?.intro_title || config.introTitle;
  const introParagraphs = content?.intro_paragraphs || config.introParagraphs;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: config.label, path: config.path },
      ])} />
      {config.path === "/shop/hoodies" && <JsonLd data={faqPageJsonLd([
        { question: "What does 350 GSM mean?", answer: "GSM is grams per square metre. It is the weight of the fabric. 350 GSM is a heavy, dense cotton fleece that feels substantial and warm." },
        { question: "How should I wash my hoodie?", answer: "Wash inside out with similar colours in cold or normal water with mild detergent. Do not bleach. Avoid harsh scrubbing. Dry in shade and iron at low temperature if required. Follow the garment care label." },
        { question: "Can I get my own design printed?", answer: "Yes. Send an enquiry with your design, quantity and sizes. Minimum quantities and turnaround are confirmed in your quote." },
      ])} />}
      <Storefront hideRange>
        <main>
          <ShopCatalogue
            heading={heading}
            breadcrumbLabel={config.label}
            fixedCategory={config.category}
            productIds={config.productIds}
            introTitle={introTitle}
            introParagraphs={introParagraphs}
            summary={content?.short_intro}
          />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
