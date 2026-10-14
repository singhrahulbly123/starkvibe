import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata, categoryMetaDescription, categoryMetaTitle } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  ...buildMetadata({
  title: categoryMetaTitle("Cotton Clothing by GSM"),
  description: categoryMetaDescription("cotton clothing by GSM"),
  path: "/shop/weight",
  }),
};

export default function ShopByWeightPage() {
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "GSM", path: "/shop/weight" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Storefront hideRange>
        <main><ShopCatalogue
          introTitle="Use GSM to choose the right weight"
          introParagraphs={[
            "GSM means grams per square metre and gives you a practical sense of how light or substantial a fabric may feel. It is not a quality score by itself: fit, cotton type, weave and finishing also matter. StarkVibe uses a clear 180 to 350 GSM range so you can compare everyday tees, structured French Terry and warm fleece before choosing a product.",
            "Choose 180 GSM when breathability and easy movement are the priority, especially for warm days and kidswear. Around 220 GSM gives an oversized tee or polo more body without feeling excessive. At 240 GSM, French Terry brings softness with a stronger streetwear drape. The 350 GSM sweatshirt and hoodie are the heaviest options, suited to cooler weather, travel and winter teamwear.",
            "Once you have chosen a weight, check the fit, colour options and size guide. For custom printing, mention the event date, artwork, quantity and preferred fabric weight so the team can recommend a comfortable and dependable base for your order.",
          ]}
        /></main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
