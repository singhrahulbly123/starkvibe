import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata, categoryMetaDescription, categoryMetaTitle } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  ...buildMetadata({
  title: categoryMetaTitle("Cotton Fabric Clothing"),
  description: categoryMetaDescription("cotton fabric clothing"),
  path: "/shop/fabric",
  }),
};

export default function ShopByFabricPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Fabric", path: "/shop/fabric" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Storefront hideRange>
        <main><ShopCatalogue
          introTitle="Find the fabric feel that suits the day"
          introParagraphs={[
            "StarkVibe fabric choices are built around practical cotton clothing rather than complicated fashion language. Regular and oversized tees offer a soft, breathable base for daily outfits, while the Matty polo gives the surface a little more polish. French Terry adds a denser hand-feel and a structured drape, and cotton fleece is made for warmth, layering and substantial custom merchandise.",
            "The material affects more than softness. It changes how the garment sits, how much body it has and how suitable it feels for a season or activity. Choose breathable cotton for warm everyday use, a polo when the group needs a smarter appearance, French Terry for a streetwear silhouette, or fleece when cool weather and warmth matter most.",
            "All pieces are selected for repeat wear and custom printing. Compare the product notes, finish, fit and colour range, then share your design and quantity if you are planning a team, birthday, office or event order.",
          ]}
        /></main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
