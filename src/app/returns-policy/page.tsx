import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Returns Policy — StarkVibe", description: "Read StarkVibe guidance for returns, exchanges and custom print issues, including order checks, size selection and production concerns. Review the policy", path: "/returns-policy" });

export default function ReturnsPolicyPage() {
  return <LegalPage title="Returns policy." intro="Please check your order as soon as it arrives. We want every StarkVibe piece to reach you in the expected condition and colour." sections={[
    { title: "Returns and exchanges", body: "Unused and unworn standard products can be requested for return within 7 days of delivery. Items must be in original condition with tags and packaging intact. Return approval is required before sending an item back, and the item may be inspected after receipt." },
    { title: "Custom printed products", body: "Personalised, custom-printed and made-to-order products cannot be returned for a change of mind, size or colour. If a product arrives damaged, incorrect or has a verified production defect, contact us within 48 hours with the order number and clear photos so we can review a replacement or resolution." },
    { title: "Size and colour", body: "Please use the size guide and confirm colour, quantity and size breakdown before production. Colour may vary slightly between screens and fabric batches. Requests based only on a preference change are not eligible once a custom order is approved." },
    { title: "How to contact us", body: "Send your order number, registered phone or email, and photos where relevant through the StarkVibe contact channel. Do not ship anything back before our team confirms the return address and next steps." },
  ]} />;
}
