import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cart", "/checkout", "/my-account"],
    },
    sitemap: "https://starkvibe.com/sitemap.xml",
    host: "https://starkvibe.com",
  };
}
