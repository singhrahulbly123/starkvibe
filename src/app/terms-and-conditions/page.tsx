import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms and Conditions — StarkVibe", description: "Review the StarkVibe terms for products, pricing, custom artwork, orders, payment, website use and contact before placing an order. Read the full terms.", path: "/terms-and-conditions" });

export default function TermsPage() {
  return <LegalPage title="Terms & conditions." intro="By using this website or placing an order, you agree to these terms. Product, delivery and custom printing details are confirmed before an order is accepted." sections={[
    { title: "Products and pricing", body: "Product images are intended to show the garment and colour as accurately as possible. Prices, availability and delivery charges may change. The final confirmed order summary is the reference for your purchase." },
    { title: "Custom artwork", body: "You confirm that you have the right to use artwork, logos, photographs, names and other material submitted for printing. You must not submit unlawful, infringing, hateful or deceptive material. We may refuse work that creates legal or production risk." },
    { title: "Orders and payment", body: "An enquiry or checkout request is not acceptance until availability, production details, delivery and payment terms are confirmed. Cash on delivery availability is subject to address and order review." },
    { title: "Website use", body: "Do not misuse the website, attempt unauthorised access, upload harmful files or interfere with its operation. Website content, brand assets and copy may not be reused without permission." },
    { title: "Contact", body: "For questions about these terms, email info@starkvibe.com." },
  ]} />;
}
