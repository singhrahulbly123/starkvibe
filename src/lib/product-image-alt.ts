import type { Colour, Product } from "./catalogue";

const views: Record<string, string[]> = {
  "Hoodie-Beige": ["side view", "hood and logo close-up", "worn outdoors", "side view", "front view", "back view"],
  "Hoodie-black": ["side view", "back view", "side view", "worn outdoors", "front view", "hood and fabric close-up"],
  "Hoodie-Coffee-Brown": ["front view", "side view", "back view", "side view", "fabric and garment detail collage", "worn outdoors", "worn outdoors"],
  "Hoodie-Off-White": ["back view", "side view", "side view", "worn outdoors", "front view"],
  "Hoodie-Olive-Green": ["side view", "back view", "hood and fabric detail collage", "side view", "worn outdoors", "front view"],
  "Sweatshirt(NavyBlue)": ["front view", "side view", "fabric and garment detail collage", "back view", "worn outdoors", "side view"],
  "Sweatshirt-black": ["side view", "side view", "back view", "worn outdoors", "front view", "fabric and garment detail collage"],
  "Sweatshirt-Lavender": ["worn outdoors", "front view", "side view", "back view", "side view", "fabric and garment detail collage", "fabric and garment detail collage"],
  "Sweatshirt-Maroon": ["side view", "side view", "front view", "back view", "worn outdoors", "fabric and garment detail collage"],
  "Sweatshirt-Offwhite": ["back view", "side view", "fabric and garment detail collage", "garment detail collage", "side view", "front view", "side view"],
};

// The keys follow the alphabetically sorted filenames in each original gallery folder.
const names: Record<string, string[]> = {
  "Hoodie-Beige": ["Camel-Hoodie-in-a-Mountain-Setting-Beige.png", "Camel-Hoodie-with-Starkvibe-Logo-Beige.png", "Mustard-Hoodie-Mountain-Terrace-Portrait-Beige.png", "Mustard-Hoodie-on-a-Sunlit-Mountain-Terrace-Beige.png", "Starkvibe-Hoodie-in-Sunlit-Mountains-Beige.png", "Tan-Hoodie-Against-a-Mountain-Landscape-Beige.png"],
  "Hoodie-black": ["Black-Hoodie-Against-Mountain-Backdrop-Black.png", "Black-Hoodie-Against-Mountain-black.png", "Black-Hoodie-on-a-Sunlit-Mountain-Terrace.png", "Outdoor-Starkvibe-Portrait-by-the-Mountains-black.png", "Starkvibe-Hoodie-in-Sunlit-Setting-black.png", "Starkvibe-Hoodie-Texture-Close-Up-black.png"],
  "Hoodie-Coffee-Brown": ["Brown-Starkvibe-Hoodie-in-Sunlit-Courtyard-Coffee-Brown.png", "Brown-Starkvibe-Hoodie-on-Terrace-Coffee-Brown.png", "Chocolate-Brown-Hoodie-on-a Sunny-Terrace-Coffee-Brown.png", "Chocolate-Hoodie-on-a-Sunlit-Terrace-Coffee-Brown.png", "Starkvibe-Brown-Hoodie-Detail-Showcase-Coffee-Brown.png", "Urban-Brown-Hoodie-Editorial-Coffee-Brown.png", "Urban-Brown-Hoodie-Portrait-Coffee-Brown.png"],
  "Hoodie-Off-White": ["Cream-Hoodie-Against-Mountain-Sky-Off-White.png", "Cream-Hoodie-on-a-Sunlit-Terrace-Off-White.png", "Ivory-Hoodie-on-a-Mountain-Terrace-Off-White.png", "Starkvibe-350-GSM-Fleece-Hoodie-Off-White.png", "Starkvibe-Hoodie-in-Sunny-Terrace-Setting-Off-White.png"],
  "Hoodie-Olive-Green": ["Olive-Green-Hoodie-on-a-Mountain-Terrace-Olive-Green.png", "Olive-Hoodie-Against-Mountain-Vista-Olive-Green.png", "Olive-Hoodie-Detail-Showcase-Olive-Green.png", "Olive-Hoodie-in-a-Sunny-Mountain-Setting-Olive-Green.png", "Olive-Hoodie-Mountain-Terrace-Portrait-Olive-Green.png", "Olive-Starkvibe-Hoodie-on-Sunlit-Terrace-Olive-Green.png"],
  "Sweatshirt(NavyBlue)": ["Navy Starkvibe Sweatshirt on Terrace.png", "Navy Sweatshirt Against Mountainous Terrace Views.png", "Navy Sweatshirt Detail Showcase.png", "Navy Sweatshirt in Sunlit Terrace Setting.png", "Navy Sweatshirt on a Sunny Terrace (1).png", "Navy Sweatshirt on a Sunny Terrace.png"],
  "Sweatshirt-black": ["Black Starkvibe Sweatshirt in Sunlit Courtyard.png", "Black Starkvibe Sweatshirt in Sunlit Setting.png", "Black Sweatshirt on a Sunny Terrace.png", "Outdoor Starkvibe Portrait by the Mountains.png", "Starkvibe Black Sweatshirt in Sunlit Setting.png", "Starkvibe Premium Fleece Sweatshirt.png"],
  "Sweatshirt-Lavender": ["Lavender Lookbook by the Hills.png", "Lavender Starkvibe Sweatshirt in Sunlight.png", "Lavender Starkvibe Sweatshirt Outdoors.png", "Lavender Sweatshirt on a Sunny Terrace.png", "Lavender Sweatshirt Overlooking Mountain Terrace.png", "Premium Lilac Fleece Sweatshirt Showcase.png", "Starkvibe Lavender Sweatshirt Details.png"],
  "Sweatshirt-Maroon": ["Burgundy Starkvibe Sweatshirt on Terrace (1).png", "Burgundy Starkvibe Sweatshirt on Terrace (2).png", "Burgundy Starkvibe Sweatshirt on Terrace.png", "Burgundy Sweatshirt in Sunlit Garden.png", "Maroon Starkvibe Sweatshirt Portrait.png", "Maroon Sweatshirt Premium Feature Collage.png"],
  "Sweatshirt-Offwhite": ["Cream Sweatshirt in a Sunny Mountain Setting.png", "Ivory Starkvibe Sweatshirt in Sunlit Terrace.png", "Premium Cream Sweatshirt Detail Collage.png", "Premium Cream Sweatshirt Detail Guide.png", "Starkvibe Sweatshirt in Mediterranean Sunlight.png", "Starkvibe Sweatshirt on Sunny Terrace.png", "Starkvibe Sweatshirt on Terrace Rail.png"],
};

export function productImageAlt(product: Product, colour: Colour, image: string): string {
  const path = decodeURIComponent(image.split("?")[0]);
  const parts = path.split("/");
  const folder = parts[parts.length - 2];
  const index = names[folder]?.indexOf(parts[parts.length - 1]) ?? -1;
  const kind = product.slug?.includes("sweatshirt") ? "fleece crewneck sweatshirt" : product.slug?.includes("hoodie") ? "fleece hoodie" : product.name.replace(/^StarkVibe\s*/i, "").replace(/\b\d+\s*GSM\b\s*/i, "").replace(/\s*[-–]\s*[^-–]+$/, "");
  const detail = index >= 0 ? ` ${views[folder][index]}` : "";
  return `${colour.name} ${product.gsm} GSM ${kind}${detail}`.replace(/\s+/g, " ").trim();
}
