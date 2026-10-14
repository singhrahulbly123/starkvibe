import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import type { ShopFilters } from "@/lib/shop";

export type CategoryShopConfig = {
  path: string;
  label: string;
  heading: string;
  category: ShopFilters["category"];
  productIds: string[];
  introTitle: string;
  introParagraphs: string[];
};

export function CategoryShopPage({ config }: { config: CategoryShopConfig }) {
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
            heading={config.heading}
            breadcrumbLabel={config.label}
            fixedCategory={config.category}
            productIds={config.productIds}
            introTitle={config.introTitle}
            introParagraphs={config.introParagraphs}
          />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
