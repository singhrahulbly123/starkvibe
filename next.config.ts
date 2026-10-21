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

const locationRedirects = [
  ["delhi", "/locations/delhi-ncr"],
  ["ghaziabad", "/locations/delhi-ncr"],
  ["amaravati", "/locations"],
  ["itanagar", "/locations"],
  ["dispur", "/locations"],
  ["patna", "/locations"],
  ["raipur", "/locations"],
  ["panaji", "/locations"],
  ["gandhinagar", "/locations"],
  ["chandigarh", "/locations"],
  ["shimla", "/locations"],
  ["ranchi", "/locations"],
  ["thiruvananthapuram", "/locations"],
  ["bhopal", "/locations"],
  ["imphal", "/locations"],
  ["shillong", "/locations"],
  ["aizawl", "/locations"],
  ["kohima", "/locations"],
  ["bhubaneswar", "/locations"],
  ["gangtok", "/locations"],
  ["chennai", "/locations"],
  ["agartala", "/locations"],
  ["kolkata", "/locations"],
  ["indore", "/locations"],
  ["gurgaon", "/locations"],
  ["rudrapur", "/locations"],
  ["varanasi", "/locations"],
] as const;

const shopCategoryRedirects = [
  ["tees", "/shop/t-shirts"],
  ["polo", "/shop/polos"],
  ["kids", "/shop/kids"],
] as const;

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "https", hostname: "api.starkvibe.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2056],
  },
  async redirects() {
    return [
      ...productRedirects.map(([oldSlug, newSlug]) => ({
        source: `/products/${oldSlug}`,
        destination: `/products/${newSlug}`,
        statusCode: 301,
      })),
      ...locationRedirects.map(([slug, destination]) => ({
        source: `/locations/${slug}`,
        destination,
        statusCode: 301,
      })),
      ...shopCategoryRedirects.map(([category, destination]) => ({
        source: "/shop",
        has: [{ type: "query" as const, key: "category", value: category }],
        destination,
        statusCode: 301,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "object-src 'none'",
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://accounts.google.com`,
              "connect-src 'self' http://127.0.0.1:8000 http://localhost:8000 https://starkvibe.com https://www.starkvibe.com https://api.starkvibe.com https://www.google-analytics.com https://region1.google-analytics.com https://accounts.google.com https://oauth2.googleapis.com",
              "frame-src 'self' https://accounts.google.com",
              "img-src 'self' blob: data: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
