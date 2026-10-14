import type { CategoryShopConfig } from "@/components/category-shop-page";

export const categoryPages: Record<string, CategoryShopConfig> = {
  tshirts: {
    path: "/shop/t-shirts", label: "T-shirts", heading: "T-shirts.", category: "tees",
    productIds: ["oversized", "regular", "terry"], introTitle: "Cotton tees across three weights",
    introParagraphs: [
      "StarkVibe T-shirts cover 180, 220 and 240 GSM in 100% cotton styles made for everyday wear. Choose a regular fit for a clean, easy shape, an oversized tee for a relaxed streetwear silhouette, or French Terry when you want a denser hand-feel and more structure. The range keeps the choice clear across three familiar fabric weights.",
      "Every tee is double bio-washed, silicon washed and double stitched. Those details keep the range focused on a soft finish, comfortable repeat wear and dependable construction. Compare the fabric weights, colours and product notes to find the piece that suits your wardrobe or custom-printing brief. The product cards show each available option so you can review the range before choosing.",
    ],
  },
  polos: {
    path: "/shop/polos", label: "Polos", heading: "Polos.", category: "polo",
    productIds: ["polo"], introTitle: "A polished 220 GSM cotton polo",
    introParagraphs: [
      "The StarkVibe polo is a 220 GSM Matty style in 100% cotton, giving everyday dressing a more polished direction while keeping the comfort and breathability described in the product range. It works as a simple standalone piece or as a clean base for a custom-printing brief. The single polo page keeps its fabric and colour choice easy to compare.",
      "This polo is double bio-washed, silicon washed and double stitched. Use the product card to compare its available colours, check the current product details and choose the option that fits your wardrobe, team or office clothing idea without adding unnecessary complexity. Product information remains next to the piece so the choice stays straightforward.",
    ],
  },
  kids: {
    path: "/shop/kids", label: "Kids", heading: "Kids tees.", category: "kids",
    productIds: ["kids"], introTitle: "A soft 180 GSM cotton tee for kids",
    introParagraphs: [
      "The StarkVibe kids T-shirt is a 180 GSM 100% cotton tee designed around a soft, flexible feel for active days. Its regular shape keeps the styling straightforward, while the available colours make it easy to coordinate a group, birthday look or custom-printing idea. The lighter weight also makes it a clear starting point when you are comparing the wider cotton range.",
      "Like the rest of the range, it is double bio-washed, silicon washed and double stitched. Browse the product card for the current colour options and details, then compare it with the other cotton weights if you are choosing pieces for a mixed-age group or a wider clothing brief. Keep the product notes open while you make the final selection.",
    ],
  },
  sweatshirts: {
    path: "/shop/sweatshirts", label: "Sweatshirts", heading: "Sweatshirts.", category: "fleece",
    productIds: ["sweatshirt"], introTitle: "Substantial 350 GSM cotton fleece",
    introParagraphs: [
      "The StarkVibe sweatshirt is made in 350 GSM cotton fleece for a substantial feel with warmth, softness and durability. It gives cooler-weather dressing a simple everyday layer, while the clean surface also leaves room for a custom-printing or group-clothing direction. The heavier fabric weight makes it easy to distinguish from the lighter 180, 220 and 240 GSM T-shirts.",
      "The sweatshirt is double bio-washed, silicon washed and double stitched. That combination keeps the product story focused on fabric feel and construction rather than extra claims. Review the product card for its available colours and details, then use the custom-printing link when you are planning a branded group order. The page shows the sweatshirt on its own for a focused choice.",
    ],
  },
  hoodies: {
    path: "/shop/hoodies", label: "Hoodies", heading: "Hoodies.", category: "fleece",
    productIds: ["hoodie"], introTitle: "350 GSM cotton fleece for layering",
    introParagraphs: [
      "The StarkVibe hoodie is a 350 GSM 100% cotton fleece layer with the warmth, softness and durability associated with the heavier end of the range. Its streetwear direction makes it a natural option for everyday outfits, group clothing and custom branding where a substantial layer is useful. The product page keeps the hoodie separate from the matching sweatshirt.",
      "The hoodie is double bio-washed, silicon washed and double stitched. Browse its product card for the current colour options and product details, then use the custom-printing route if you are planning a design for a group or campaign. The product grid keeps this hoodie focused, while the shop filters still let you compare fabric weight and other choices.",
    ],
  },
};
