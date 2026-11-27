import type { Product } from "./catalogue";
import type { Metadata } from "next";
import { sizesFor } from "./product-details";

const siteUrl = "https://starkvibe.com";
const defaultImage = "/branding/starkvibe-wordmark-premium.png";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

function cleanPath(path: string) {
  const pathname = path.split("?")[0].replace(/^\/+/, "/").replace(/\/+$/, "");
  return pathname || "/";
}

export function buildMetadata({ title, description, path, image = defaultImage, imageAlt = title }: BuildMetadataOptions): Metadata {
  const pathname = cleanPath(path);
  const url = pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${cleanPath(image)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }] },
    twitter: { title, description, images: [imageUrl] },
  };
}

export function productMetaTitle(product: Product) {
  if (product.meta_title) return plainMetadata(product.meta_title, product);
  if (product.slug?.startsWith("350-gsm-fleece-hoodie-") || product.slug?.startsWith("350-gsm-fleece-sweatshirt-")) {
    const kind = product.slug.includes("sweatshirt") ? "Sweatshirt" : "Hoodie";
    return `${product.colours[0]?.name || ""} 350 GSM Fleece ${kind}${kind === "Hoodie" ? " for Men" : ""} | StarkVibe`.trim();
  }
  return product.meta_title || `${product.name} | StarkVibe`;
}

export function productMetaDescription(product: Product) {
  if (product.meta_description) return plainMetadata(product.meta_description, product);
  if (product.slug?.startsWith("350-gsm-fleece-hoodie-") || product.slug?.startsWith("350-gsm-fleece-sweatshirt-")) {
    const colour = product.colours[0]?.name || "";
    const sizes = sizesFor(product).join(", ");
    return product.slug.includes("sweatshirt")
      ? `Buy the ${colour} 350 GSM 100% cotton fleece crewneck sweatshirt. Long sleeves, double stitched. Sizes ${sizes}. Custom printing available.`
      : `Buy the ${colour} 350 GSM 100% cotton fleece hoodie. Regular fit, kangaroo pocket, double stitched. Sizes ${sizes}. Custom printing available.`;
  }
  return product.meta_description || product.note;
}

function plainMetadata(value: string, product: Product) {
  return value.replace(/\{colour\}/gi, product.colours[0]?.name || "")
    .replace(/\{sizes\}/gi, sizesFor(product).join(", "))
    .replace(/<[^>]*>/g, "").trim();
}

export function categoryMetaTitle(category: string) {
  return `${category} - StarkVibe`;
}

export function categoryMetaDescription(category: string) {
  const description = `Explore ${category.toLowerCase()} at StarkVibe: cotton T-shirts, polos, sweatshirts and hoodies for everyday wear, teams and custom printing. Compare fits and GSM.`;
  return description.length > 160 ? description.replace(" Compare fits and GSM.", " Compare fits.") : description;
}

const blogDescriptionSuffixes: Record<string, string> = {
  "how-to-choose-the-right-gsm-t-shirt": " Compare weights before you buy.",
  "custom-t-shirt-printing-order-checklist": " Keep order details clear.",
  "how-to-care-for-cotton-t-shirts-and-fleece": " Keep garments looking good.",
  "how-to-choose-a-premium-cotton-t-shirt": " Make a better everyday choice.",
  "cotton-clothing-styling-tips": " Build easy outfits every day.",
};

export function blogMetaDescription(slug: string, description: string) {
  return `${description}${blogDescriptionSuffixes[slug] || " Read the practical guide before you choose."}`;
}

export function locationMetaTitle(city: string) {
  return `${city} Cotton Clothing Store | StarkVibe Online`;
}

export function locationMetaDescription(city: string) {
  const description = `Shop ${city} cotton clothing online: premium T-shirts, polos, sweatshirts and hoodies for teams, events, gifting and custom printing with StarkVibe.`;
  return description.length < 150 ? `${description} nationwide` : description;
}
