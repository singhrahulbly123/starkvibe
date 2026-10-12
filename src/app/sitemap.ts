import type { MetadataRoute } from "next";
import { productImage, products } from "@/lib/catalogue";
import { blogPosts } from "@/lib/blog";

const baseUrl = "https://starkvibe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["/", 1, "weekly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.6, "monthly"],
    ["/blog", 0.7, "monthly"],
    ["/editorial-policy", 0.3, "yearly"],
    ["/shop", 0.9, "weekly"],
    ["/shop/weight", 0.8, "monthly"],
    ["/shop/fabric", 0.8, "monthly"],
    ["/shop/colours", 0.8, "monthly"],
    ["/custom-printing", 0.8, "monthly"],
    ["/custom-printing/birthday", 0.8, "monthly"],
    ["/custom-printing/office-bulk", 0.8, "monthly"],
    ["/custom-printing/anniversary", 0.7, "monthly"],
    ["/custom-printing/gifting", 0.7, "monthly"],
    ["/custom-printing/political-campaigns", 0.7, "monthly"],
    ["/design-your-own", 0.7, "monthly"],
    ["/privacy-policy", 0.2, "yearly"],
    ["/shipping-policy", 0.2, "yearly"],
    ["/returns-policy", 0.2, "yearly"],
    ["/terms-and-conditions", 0.2, "yearly"],
  ] as const;

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [
        `${baseUrl}${productImage(product, product.colours[0])}`,
      ],
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
