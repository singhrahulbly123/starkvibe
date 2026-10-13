import type { NextConfig } from "next";

const productRedirects = [
  ["regular", "regular-fit-180-gsm-tee"],
  ["oversized", "oversized-220-gsm-tee"],
  ["terry", "oversized-240-gsm-french-terry-tee"],
  ["polo", "polo-220-gsm-matty-tee"],
  ["kids", "kids-regular-180-gsm-tee"],
  ["sweatshirt", "350-gsm-fleece-sweatshirt"],
  ["hoodie", "350-gsm-fleece-hoodie"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return productRedirects.map(([oldSlug, newSlug]) => ({
      source: `/products/${oldSlug}`,
      destination: `/products/${newSlug}`,
      statusCode: 301,
    }));
  },
};

export default nextConfig;
