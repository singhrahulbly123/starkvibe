# StarkVibe SEO content prompts

इन prompts को ChatGPT, Codex या किसी approved content workflow में उपयोग करें। हर बार केवल verified product facts दें; certification, fabric composition, availability, price या delivery के बारे में अनुमान न लगाएँ।

## Product description

```text
Write a clear, SEO-friendly product description for StarkVibe.

Product name: [Product Name]
Primary keyword: [Primary Keyword]
Fabric: [Verified Fabric]
GSM: [GSM]
Fit: [Fit]
Features: [Verified Features]
Available colours: [Colours]
Best for: [Use Cases]

Requirements:
- Write 130–170 words in simple English.
- Explain material, comfort, fit, finish, use cases and care naturally.
- Use the primary keyword naturally, without keyword stuffing.
- Do not claim organic, OEKO-TEX certified, sustainable or performance-tested unless the supplied facts explicitly verify it.
- Do not invent price, stock, delivery or warranty details.
- End with a helpful buying suggestion.
```

## Meta description

```text
Generate one 145–160 character meta description for this StarkVibe product:

Product: [Product Name]
Primary keyword: [Keyword]
Verified facts: [Fabric], [GSM], [Fit], [Top feature]

Use the keyword naturally, mention StarkVibe, and write a useful shopping-focused sentence. Return only the meta description and do not add unsupported claims.
```

## Article outline

```text
Create an SEO content outline for a StarkVibe article titled “2026 Cotton Fabric Trends”.

Audience: Indian shoppers comparing cotton T-shirts, polos, sweatshirts and hoodies.
Primary keyword: [Keyword]
Secondary keywords: [Keywords]

Include:
- One clear H1 and 5–7 useful H2 sections.
- Key points and search intent for every section.
- A short introduction and conclusion.
- One practical comparison table or checklist.
- Internal-link suggestions to /shop, /shop/fabric, /shop/weight and relevant product pages.
- Two factual FAQ questions.

Avoid invented statistics, fake certifications and generic keyword stuffing.
```

## Product JSON-LD schema

```text
Generate valid JSON-LD for this verified StarkVibe product using Schema.org Product.

Facts:
- Name: [Product Name]
- SKU: [SKU]
- Brand: StarkVibe
- Description: [Approved Product Description]
- Material: [Verified Material]
- GSM: [GSM]
- Colours: [Colours]
- Sizes: [Sizes]
- Price: [Sale Price]
- Currency: INR
- Product URL: https://starkvibe.com/products/[slug]
- Image URLs: [Absolute Image URLs]
- Availability: [InStock or verified value]

Return JSON only, with:
@context, @type, name, description, sku, brand, material, color, size,
additionalProperty for GSM, image, url and offers.

Rules:
- Do not include ratings or reviews unless real published data is supplied.
- Do not include certifications unless verified.
- Keep price and availability consistent with the product page.
```

Example structure:

```ts
const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PREFIX Product Name",
  description: "Approved product description",
  sku: "PREFIX-SKU",
  brand: { "@type": "Brand", name: "StarkVibe" },
  material: "Verified material",
  additionalProperty: [
    { "@type": "PropertyValue", name: "GSM", value: "220 GSM" },
  ],
  image: ["https://starkvibe.com/products/example.jpg"],
  offers: {
    "@type": "Offer",
    url: "https://starkvibe.com/products/prefix-product-name",
    priceCurrency: "INR",
    price: "1149",
    availability: "https://schema.org/InStock",
  },
};
```

## FAQ and image alt text

```text
Write 4 concise FAQ questions and answers for [Product Name].
Use only these verified facts: [Facts].
Cover GSM, fit, colours, care and custom printing. Do not invent shipping,
certification, warranty or return promises.
```

```text
Write one descriptive, accessible alt text for this product image.
Product: [Product Name]
Colour: [Colour]
View: [Front/back/detail/lifestyle]
Include the product type, colour and GSM only if visible or verified. Keep it
under 125 characters and do not start with “image of” or “photo of”.
```
