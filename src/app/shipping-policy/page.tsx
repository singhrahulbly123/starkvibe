import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Shipping Policy — StarkVibe", description: "StarkVibe shipping and delivery information.", path: "/shipping-policy" });

export default function ShippingPolicyPage() {
  return <LegalPage title="Shipping policy." intro="We confirm delivery availability, shipping charges and the expected timeline before accepting your order." sections={[
    { title: "Processing time", body: "Standard products are prepared after order confirmation. Custom printed and bulk orders require additional production time, which is confirmed after artwork, quantity, sizes and colours are reviewed." },
    { title: "Delivery details", body: "Delivery timelines can vary by destination, product availability and order size. Please provide a complete address, PIN code and reachable phone number. Delays caused by incorrect address, courier issues or events outside our control may affect delivery." },
    { title: "Custom and bulk orders", body: "Production begins after the final design and order details are approved. A quote or WhatsApp confirmation will mention the expected dispatch and delivery timeline for your specific order." },
    { title: "Tracking and support", body: "When tracking information is available, we will share it through the contact details provided with the order. Contact singhrahulbly123@gmail.com if your parcel needs attention." },
  ]} />;
}
