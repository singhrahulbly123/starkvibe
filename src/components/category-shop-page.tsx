import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
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
