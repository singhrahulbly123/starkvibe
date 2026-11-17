import { notFound } from "next/navigation";
import { Storefront } from "@/components/storefront";
import { SiteFooter } from "@/components/site-footer";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const collections = {
  "oversized-t-shirts": {
    title: "Oversized T-Shirts India | StarkVibe",
    description: "Shop StarkVibe oversized cotton T-shirts in India. Compare 220 GSM relaxed-fit colours, sizing and custom printing options.",
    heading: "Oversized cotton T-shirts",
    introTitle: "Oversized T-shirts, made for everyday streetwear",
    paragraphs: [
      "Explore the StarkVibe oversized T-shirt collection in 220 GSM 100% cotton. The relaxed silhouette gives everyday outfits more shape while the bio-washed, silicon-washed finish keeps the hand-feel comfortable.",
      "Choose your colour and size, then order a single piece or enquire about custom printed oversized T-shirts for teams, events and gifting across India.",
    ],
    productIds: ["oversized"],
  },
  "clean-classics": {
    title: "Clean Classic Cotton T-Shirts India | StarkVibe",
    description: "Shop clean classic cotton T-shirts and polos from StarkVibe. Comfortable regular fits and polished everyday styles for India-wide delivery.",
    heading: "Clean classic cotton clothing",
    introTitle: "Clean classics for everyday wear",
    paragraphs: [
      "Keep the look simple with comfortable cotton basics designed for repeat wear. Regular-fit T-shirts and Matty polos give you breathable fabric, clean construction and easy colour choices.",
      "These classic pieces work for daily wardrobes, office teams, uniforms and custom printed group orders. Compare the available sizes and colours before choosing.",
    ],
    productIds: ["regular", "polo"],
  },
  "statement-prints": {
    title: "Statement Print T-Shirts India | StarkVibe",
    description: "Explore StarkVibe statement-ready cotton T-shirts for custom printing, events, teams and gifting. Choose your garment and start an enquiry.",
    heading: "Statement T-shirts for custom printing",
    introTitle: "Make the print the statement",
    paragraphs: [
      "Build a stronger visual identity with premium cotton T-shirts selected for custom printing. Choose an oversized, regular or structured French Terry base, then share your artwork, quantity and size mix.",
      "StarkVibe helps with birthday groups, office teams, college events, campaigns and personalised gifts. Final artwork, production timing and the quote are confirmed before printing.",
    ],
    productIds: ["oversized", "regular", "terry"],
  },
  "french-terry": {
    title: "French Terry T-Shirts India | StarkVibe",
    description: "Shop the StarkVibe 240 GSM French Terry oversized T-shirt in India. Compare the structured cotton feel, colours and custom printing options.",
    heading: "240 GSM French Terry T-shirts",
    introTitle: "French Terry with more structure",
    paragraphs: [
      "French Terry gives an oversized T-shirt a denser, more structured drape while keeping the comfort of cotton. It is a strong choice for elevated streetwear, cooler days and custom merchandise.",
      "Review the available colours and sizes, or contact StarkVibe for a coordinated French Terry order for your team, event or collection.",
    ],
    productIds: ["terry"],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(collections).map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const data = collections[collection as keyof typeof collections];
  if (!data) return buildMetadata({ title: "Collection not found — StarkVibe", description: "The requested StarkVibe collection could not be found.", path: `/shop/${collection}` });
  return buildMetadata({ title: data.title, description: data.description, path: `/shop/${collection}` });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const data = collections[collection as keyof typeof collections];
  if (!data) notFound();
  const path = `/shop/${collection}`;
  return <>
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: data.heading, path }])} />
    <Storefront hideRange>
      <main>
        <ShopCatalogue heading={data.heading} introTitle={data.introTitle} introParagraphs={[...data.paragraphs]} productIds={[...data.productIds]} breadcrumbLabel={data.heading} />
      </main>
    </Storefront>
    <SiteFooter />
  </>;
}
