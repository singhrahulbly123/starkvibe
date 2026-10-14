import type { Product } from "./catalogue";

import type { Metadata } from "next";

const siteUrl = "https://starkvibe.com";
const defaultImage = "/branding/starkvibe-wordmark-premium.png";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

function cleanPath(path: string) {
  const pathname = path.split("?")[0].replace(/^\/+/, "/").replace(/\/+$/, "");
  return pathname || "/";
}

export function buildMetadata({
  title,
  description,
  path,
  image = defaultImage,
}: BuildMetadataOptions): Metadata {
  const pathname = cleanPath(path);
  const url = pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${cleanPath(image)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function productMetaTitle(product: Product) {
  return `${product.name} | Premium Cotton T-Shirt & Clothing | StarkVibe`;
}

export function productMetaDescription(product: Product) {
  return `Shop the StarkVibe ${product.name}, a premium cotton clothing choice in ${product.gsm} GSM 100% cotton. Comfortable fabric, dependable fit and colour options for every-season wear or custom printing.`;
}

export function productMetaKeywords(product: Product) {
  return [
    "premium T-shirt",
    `${product.name} premium cotton clothing`,
    `${product.gsm} GSM cotton ${product.category}`,
    "comfortable cotton",
    "comfortable cotton fabric",
    "all-season clothing",
    "best fit cotton clothing",
    "custom printed cotton clothing",
    "StarkVibe India",
  ];
}

export function categoryMetaTitle(category: string) {
  return `${category} - StarkVibe`;
}

export function categoryMetaDescription(category: string) {
  return `Explore StarkVibe men's cotton T-shirts and ${category.toLowerCase()} in high-quality 100% cotton clothing. Choose comfortable cotton, practical fits and all-season clothing for everyday wear, teams and custom printing.`;
}

export function categoryMetaKeywords(category: string) {
  return [
    category,
    "men's cotton T-shirts",
    "premium T-shirt",
    "cotton t-shirts",
    "100% cotton clothing",
    "comfortable cotton",
    "comfortable fabric",
    "all-season clothing",
    "best fit everyday wear",
    "custom printing India",
    "StarkVibe",
  ];
}

export function locationMetaTitle(city: string) {
  return `${city} Cotton Clothing Store | StarkVibe Online`;
}

export function locationMetaDescription(city: string) {
  return `Shop StarkVibe online for ${city} cotton clothing: premium T-shirts, polos, sweatshirts and hoodies in comfortable cotton for every season, with custom printing for teams, events and gifting.`;
}

export function locationMetaKeywords(city: string) {
  return [
    `${city} cotton clothing store`,
    `${city} cotton clothing`,
    `premium T-shirt in ${city}`,
    `cotton T-shirts in ${city}`,
    `${city} custom printed T-shirts`,
    `${city} bulk teamwear`,
    "comfortable cotton",
    "comfortable cotton fabric",
    "all-season clothing",
    "best fit cotton clothing",
    "StarkVibe online",
  ];
}
