import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { productImage, productSlug, salePrice } from "@/lib/catalogue";
import { buildMetadata, productMetaDescription, productMetaTitle } from "@/lib/seo";
import { ProductDetails } from "@/components/product-details";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";
import { JsonLd } from "@/components/json-ld";
import { getCatalogueProducts } from "@/lib/catalogue-server";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ colour?: string }>;
};
export async function generateStaticParams() {
  const catalogue = await getCatalogueProducts();
  return catalogue.map((product) => ({ slug: productSlug(product) }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalogue = await getCatalogueProducts();
  const product = catalogue.find((item) => item.id === slug || productSlug(item) === slug);
  if (!product) return buildMetadata({ title: "Product not found — StarkVibe", description: "The requested StarkVibe product could not be found.", path: `/products/${slug}` });
  const metadata = buildMetadata({
    title: productMetaTitle(product),
    description: productMetaDescription(product),
    path: `/products/${productSlug(product)}`,
    image: productImage(product, product.colours[0]),
  });
  const canonicalUrl = product.canonical_url || `https://starkvibe.com/products/${productSlug(product)}`;
  return {
    ...metadata,
    alternates: { canonical: canonicalUrl },
  };
}
export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { colour } = await searchParams;
  const hoodieColourSlugs: Record<string, string> = {
    black: "350-gsm-fleece-hoodie-black",
    "coffee-brown": "350-gsm-fleece-hoodie-coffee-brown",
    "off-white": "350-gsm-fleece-hoodie-off-white",
    "olive-green": "350-gsm-fleece-hoodie-olive-green",
    beige: "350-gsm-fleece-hoodie-beige",
  };
  if (slug === "350-gsm-fleece-hoodie") {
    redirect(`/products/${hoodieColourSlugs[colour || "black"] || hoodieColourSlugs.black}`);
  }
  const catalogue = await getCatalogueProducts();
  const product = catalogue.find((item) => item.id === slug || productSlug(item) === slug);
  if (!product) notFound();
  const selected = Math.max(
    0,
    product.colours.findIndex((c) => c.file === colour),
  );
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.long_description || product.note,
          image: productImage(product, product.colours[0]),
          brand: { "@type": "Brand", name: "StarkVibe" },
          category: product.category,
          color: product.colours.map((item) => item.name),
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Fabric weight",
            value: `${product.gsm} GSM`,
          },
          offers: {
            "@type": "Offer",
            url: `https://starkvibe.com/products/${productSlug(product)}`,
            priceCurrency: "INR",
            price: salePrice(product),
            seller: { "@type": "Organization", name: "StarkVibe" },
          },
        }}
      />
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:p-4"
      >
        Skip to product
      </a>
      <div className="flex flex-wrap justify-between gap-2 bg-ink px-5 py-[11px] text-[13px] text-paper lg:px-12">
        <span>
          Custom printing for birthdays, parties and events —{" "}
          <a href="/custom-printing" className="font-semibold text-gold">
            Get in touch
          </a>
        </span>
        <span className="text-[#b9b7ae]">Sale prices from ₹745</span>
      </div>
      <Storefront hideRange>
        <main>
          <ProductDetails
            key={product.id}
            product={product}
            initialColour={selected}
            relatedProducts={catalogue}
          />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
