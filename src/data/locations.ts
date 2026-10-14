export type LocalFaq = {
  question: string;
  answer: string;
};

export type LocationDetails = {
  slug: string;
  city: string;
  state: string;
  introParagraphs: [string, string];
  deliveryDays: string;
  popularOccasions: string[];
  climateNote: string;
  gsmSuggestion: string;
  localFaqs: [LocalFaq, LocalFaq, LocalFaq];
  testimonial?: string | null;
  bulkExample?: string | null;
};

export const locationDetails: LocationDetails[] = [
  {
    slug: "delhi-ncr", city: "Delhi NCR", state: "Delhi", deliveryDays: "5-7 days",
    introParagraphs: [
      "Delhi NCR has some of the widest weather swings in India: summers that regularly cross 40°C, a humid monsoon, and cold, foggy winter mornings. The right cotton weight matters more here than almost anywhere else.",
      "StarkVibe delivers premium 100% cotton t-shirts, polos, sweatshirts and hoodies across Delhi NCR, and takes custom and bulk orders for offices, colleges, coaching batches and events.",
    ], popularOccasions: ["College fests and student society events", "Corporate and startup team wear", "Coaching institute and school batch tees", "Wedding-season family and group tees", "Winter hoodies for group orders"], climateNote: "Hot, dry summers, a humid monsoon, and cold foggy winters from December to January.", gsmSuggestion: "Choose 180 GSM regular tees from April to September, 220-240 GSM for cooler months and layering, and 350 GSM fleece sweatshirts or hoodies for December and January.", localFaqs: [
      { question: "Which GSM is best for Delhi summers?", answer: "180 GSM 100% cotton is light and breathable, which suits the heat. Heavier 220-240 GSM tees are better from October onwards." },
      { question: "Can I order custom printed t-shirts for my office in Delhi NCR?", answer: "Yes. Send your logo or design through the enquiry form or WhatsApp along with quantity and sizes, and we will reply with a quote." },
      { question: "Do you make group hoodies for winter?", answer: "Yes. 350 GSM fleece hoodies and sweatshirts are available, and custom printing can be added for teams and batches." },
    ], testimonial: null, bulkExample: null,
  },
  {
    slug: "mumbai", city: "Mumbai", state: "Maharashtra", deliveryDays: "5-7 days",
    introParagraphs: [
      "Mumbai is warm and humid for most of the year, with heavy rain from June to September and barely any winter. Fabric that breathes and dries well matters more than thickness here.",
      "StarkVibe delivers premium 100% cotton clothing to Mumbai and takes custom and bulk orders for colleges, offices, housing societies and festival groups.",
    ], popularOccasions: ["College fests and department events", "Ganesh Chaturthi and Navratri group tees", "Corporate team and offsite wear", "Housing society and sports team jerseys-style tees", "Family and friends group outfits"], climateNote: "Humid and coastal almost year-round, with a heavy monsoon from June to September.", gsmSuggestion: "Stay with 180 GSM regular fit tees for daily wear. A 220 GSM oversized tee works well for air-conditioned offices. Heavy fleece is rarely needed.", localFaqs: [
      { question: "Which cotton t-shirt is best for Mumbai humidity?", answer: "A 180 GSM 100% cotton regular fit tee is breathable and comfortable in humid weather." },
      { question: "Can I order group t-shirts for Ganesh Chaturthi or Navratri?", answer: "Yes. Share your design, quantity and sizes through the enquiry form or WhatsApp, and we will quote for custom printed group tees. Please plan ahead for festival dates." },
      { question: "Do you take college fest orders from Mumbai?", answer: "Yes. Student teams can send their design and quantity through the enquiry form for a quote." },
    ], testimonial: null, bulkExample: null,
  },
  {
    slug: "bengaluru", city: "Bengaluru", state: "Karnataka", deliveryDays: "5-7 days",
    introParagraphs: [
      "Bengaluru has a mild climate for most of the year, with cool mornings and evenings, occasional showers, and warm afternoons in summer. Clothes that work through the whole day are the priority.",
      "StarkVibe delivers premium 100% cotton t-shirts, polos and hoodies to Bengaluru, and takes custom and bulk orders for tech teams, startups, colleges and community groups.",
    ], popularOccasions: ["Startup and IT team wear", "Hackathons and company offsites", "College fests and student clubs", "Running, cycling and community clubs", "Gifting and welcome kits for new joiners"], climateNote: "Moderate temperatures year-round, cool mornings and evenings, and rain showers in the monsoon months.", gsmSuggestion: "180 GSM regular tees for everyday wear, 220-240 GSM oversized tees for cooler mornings, and a hoodie or sweatshirt that works nearly year-round for evenings.", localFaqs: [
      { question: "Which t-shirt weight suits Bengaluru weather?", answer: "180 GSM for daytime and 220-240 GSM for cooler mornings. A hoodie is useful for evenings throughout the year." },
      { question: "Can my startup order custom branded t-shirts and hoodies?", answer: "Yes. Send your logo and quantity through the enquiry form or WhatsApp, and we will reply with a quote for custom printed team wear." },
      { question: "Do you offer polo shirts for company uniforms?", answer: "Yes, cotton polo shirts are available and can be customised for teams." },
    ], testimonial: null, bulkExample: null,
  },
  {
    slug: "jaipur", city: "Jaipur", state: "Rajasthan", deliveryDays: "5-7 days",
    introParagraphs: [
      "Jaipur has hot, dry summers and pleasant winters with cool nights. Light cotton for the heat and a warm layer for winter evenings covers the year.",
      "StarkVibe delivers premium 100% cotton clothing to Jaipur, and takes custom and bulk orders for weddings, events, colleges and businesses.",
    ], popularOccasions: ["Destination and family wedding group tees", "Event, festival and tourism team wear", "College and coaching batch tees", "Business and shop staff uniforms", "Festival group outfits during Teej, Holi and Diwali"], climateNote: "Hot, dry summers and mild winters with cool nights, especially in December and January.", gsmSuggestion: "180 GSM breathable cotton tees for summer, and 350 GSM fleece sweatshirts or hoodies for winter nights.", localFaqs: [
      { question: "Which fabric is best for Jaipur summers?", answer: "180 GSM 100% cotton is light and breathable, which suits dry heat." },
      { question: "Can I order matching t-shirts for a wedding group in Jaipur?", answer: "Yes. Share your design, sizes and quantity through the enquiry form or WhatsApp for a quote. Please order well before the event date." },
      { question: "Do you make staff uniform t-shirts for shops and businesses?", answer: "Yes. Cotton tees and polos can be custom printed with your logo." },
    ], testimonial: null, bulkExample: null,
  },
  {
    slug: "lucknow", city: "Lucknow", state: "Uttar Pradesh", deliveryDays: "5-7 days",
    introParagraphs: [
      "Lucknow has hot summers, a humid monsoon, and cold, foggy winters. Cotton that stays comfortable in the heat and warm fleece for winter mornings cover most needs.",
      "StarkVibe delivers premium 100% cotton clothing to Lucknow, and takes custom and bulk orders for colleges, coaching institutes, events and campaigns.",
    ], popularOccasions: ["University and coaching institute batch tees", "Family and group outfits for weddings", "Festival group tees during Diwali, Holi and Eid", "Awareness and election campaign merchandise", "Office and business uniforms"], climateNote: "Hot summers, a humid monsoon, and foggy cold winters from December to January.", gsmSuggestion: "180 GSM regular tees from March to September, 220-240 GSM tees for transition months, and 350 GSM fleece for winter.", localFaqs: [
      { question: "Which t-shirt is best for Lucknow summers?", answer: "A 180 GSM 100% cotton regular fit tee is light and breathable in the heat." },
      { question: "Can my coaching institute order batch t-shirts?", answer: "Yes. Send your design, quantity and sizes through the enquiry form or WhatsApp, and we will reply with a quote." },
      { question: "Do you do campaign merchandise orders?", answer: "Yes. Please see our custom printing options for campaign merchandise and send your requirement through the enquiry form." },
    ], testimonial: null, bulkExample: null,
  },
  {
    slug: "hyderabad", city: "Hyderabad", state: "Telangana", deliveryDays: "5-7 days",
    introParagraphs: [
      "Hyderabad has hot summers, mild winters, and monsoon showers from June to September. Lightweight cotton works for most of the year, with a light layer for winter nights.",
      "StarkVibe delivers premium 100% cotton clothing to Hyderabad, and takes custom and bulk orders for IT teams, colleges, festivals and events.",
    ], popularOccasions: ["IT and startup team wear", "College fests and student clubs", "Ganesh Chaturthi and Bonalu group tees", "Ramzan and Eid family outfits", "Wedding and family event group tees"], climateNote: "Hot summers, mild winters, and a monsoon from June to September.", gsmSuggestion: "180 GSM regular tees for everyday wear, 220 GSM oversized tees for offices, and a hoodie or sweatshirt for winter nights.", localFaqs: [
      { question: "Which cotton t-shirt works best in Hyderabad heat?", answer: "A 180 GSM 100% cotton regular fit tee is breathable and comfortable in hot weather." },
      { question: "Can my IT company order custom branded polos or t-shirts?", answer: "Yes. Send your logo and quantity through the enquiry form or WhatsApp, and we will reply with a quote." },
      { question: "Can I order group tees for a festival like Ganesh Chaturthi or Bonalu?", answer: "Yes. Share your design, sizes and quantity for a quote, and plan ahead for festival dates." },
    ], testimonial: null, bulkExample: null,
  },
];

function findTodo(value: unknown, path: string): string | undefined {
  if (typeof value === "string" && value.startsWith("TODO")) return path;
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const result = findTodo(item, `${path}[${index}]`);
      if (result) return result;
    }
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      const result = findTodo(item, `${path}.${key}`);
      if (result) return result;
    }
  }
  return undefined;
}

function validateLocationDetails(data: LocationDetails[]) {
  const todoPath = findTodo(data, "locationDetails");
  if (todoPath) {
    throw new Error(`Location data contains an unrenderable TODO at ${todoPath}. Provide a verified value before building.`);
  }
}

validateLocationDetails(locationDetails);
