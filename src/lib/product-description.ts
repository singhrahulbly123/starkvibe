type ProductDescriptionInput = {
  name: string;
  fabric: string;
  gsm: number;
  features: string[];
  colours?: string[];
  audience?: string;
  useCases?: string[];
};

export type ProductDescriptionOutput = {
  description: string;
  metaDescription: string;
  seoKeywords: string[];
};

const outputSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    description: { type: "string" },
    metaDescription: { type: "string" },
    seoKeywords: { type: "array", items: { type: "string" } },
  },
  required: ["description", "metaDescription", "seoKeywords"],
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function generateProductDescription(input: ProductDescriptionInput): Promise<ProductDescriptionOutput> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const model = process.env.OPENAI_MODEL || "gpt-5-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions: [
        "You write factual, helpful ecommerce content for StarkVibe clothing.",
        "Use only the supplied product facts. Never invent certifications, sustainability claims, fabric composition, prices, stock, delivery promises or performance guarantees.",
        "Write in clear English. Keep the product description between 130 and 170 words, with natural SEO phrasing and no keyword stuffing.",
        "The meta description must be 145 to 160 characters. Return only the requested JSON object.",
      ].join(" "),
      input: JSON.stringify({
        task: "Generate a product description from these attributes.",
        product: {
          name: cleanText(input.name, 120),
          fabric: cleanText(input.fabric, 120),
          gsm: input.gsm,
          features: input.features.map((feature) => cleanText(feature, 120)).filter(Boolean).slice(0, 12),
          colours: (input.colours || []).map((colour) => cleanText(colour, 60)).filter(Boolean).slice(0, 20),
          audience: cleanText(input.audience, 120),
          useCases: (input.useCases || []).map((useCase) => cleanText(useCase, 120)).filter(Boolean).slice(0, 10),
        },
      }),
      text: {
        format: {
          type: "json_schema",
          name: "product_description",
          strict: true,
          schema: outputSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorBody.slice(0, 300)}`);
  }

  const result = (await response.json()) as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  const outputText = result.output_text || result.output?.flatMap((item) => item.content || []).map((part) => part.text || "").join("");
  if (!outputText) throw new Error("OpenAI returned no generated content");

  const parsed = JSON.parse(outputText) as Partial<ProductDescriptionOutput>;
  if (!parsed.description || !parsed.metaDescription || !Array.isArray(parsed.seoKeywords)) {
    throw new Error("OpenAI returned an incomplete product description");
  }
  return {
    description: parsed.description,
    metaDescription: parsed.metaDescription,
    seoKeywords: parsed.seoKeywords.filter((keyword): keyword is string => typeof keyword === "string").slice(0, 12),
  };
}
