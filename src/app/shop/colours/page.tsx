import { ShopCatalogue } from "@/components/shop-catalogue";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { buildMetadata, categoryMetaDescription, categoryMetaKeywords, categoryMetaTitle } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
  title: categoryMetaTitle("Cotton Clothing by Colour"),
  description: categoryMetaDescription("cotton clothing by colour"),
  path: "/shop/colours",
  }),
  keywords: categoryMetaKeywords("cotton clothing by colour"),
};

export default function ShopByColourPage() {
  return (
    <>
      <Storefront hideRange>
        <main><ShopCatalogue
          introTitle="Choose a colour that earns repeat wear"
          introParagraphs={[
            "Colour is often the first decision people make when choosing a T-shirt, polo or fleece layer. StarkVibe keeps the range practical, with everyday neutrals alongside deeper shades and brighter options that help a group order feel more personal. Browse the collection by colour to compare how each garment works with casual wardrobes, team branding and custom artwork.",
            "Black, white and navy are dependable choices for regular wear and clean logo placement. Earthy browns, beige and olive tones give streetwear outfits a softer, considered feel, while maroon, lavender, pink and orange make birthdays, family groups or event merchandise more expressive. The right shade also depends on the design: contrast helps a small chest logo read clearly, while tonal artwork can feel more subtle.",
            "Select a product to review its fabric weight, available sizes and exact colour options. For mixed-colour custom orders, send the preferred palette and size list together so the final artwork and garment combination can be confirmed before production.",
          ]}
        /></main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
