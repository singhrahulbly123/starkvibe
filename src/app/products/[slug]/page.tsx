import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/catalogue";
import { ProductDetails } from "@/components/product-details";
import { SiteFooter } from "@/components/site-footer";
import { Storefront } from "@/components/storefront";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ colour?: string }>;
};
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  return {
    title: product
      ? `${product.name} — StarkVibe`
      : "Product not found — StarkVibe",
    description: product?.note,
  };
}
export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();
  const { colour } = await searchParams;
  const selected = Math.max(
    0,
    product.colours.findIndex((c) => c.file === colour),
  );
  return (
    <>
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-gold focus:p-4"
      >
        Skip to product
      </a>
      <div className="flex flex-wrap justify-between gap-2 bg-ink px-5 py-[11px] text-[13px] text-paper lg:px-12">
        <span>
          Custom printing for birthdays, parties and events —{" "}
          <a href="/#custom" className="font-semibold text-gold">
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
          />
        </main>
      </Storefront>
      <SiteFooter />
    </>
  );
}
