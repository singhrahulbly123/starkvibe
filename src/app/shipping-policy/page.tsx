import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Shipping Policy — StarkVibe", description: "Read StarkVibe shipping guidance covering order processing, delivery details, custom and bulk production, tracking and support for each order. Plan ahead.", path: "/shipping-policy" });

export default function ShippingPolicyPage() {
  return <LegalPage title="Shipping policy." intro="We confirm the final delivery estimate and shipping charge at checkout, based on your PIN code, order size and delivery method." sections={[
    { title: "Delivery timeline", body: "Standard orders are usually delivered within 5–7 working days across India after order confirmation. Express delivery is usually 3–4 working days where available for the destination PIN code. Delivery estimates can change for remote locations, public holidays, weather or courier delays. The final estimate for your PIN code is shown or confirmed before dispatch." },
    { title: "Shipping charges", body: "The applicable shipping charge is displayed at checkout before you place the order. There is no hidden shipping fee after order confirmation. For large, custom or bulk orders, the team will confirm the delivery charge in the quotation." },
    { title: "Custom and bulk orders", body: "Custom printing and bulk orders require production time in addition to delivery. We confirm the artwork approval, production timeline and dispatch estimate in the quotation before production starts." },
    { title: "Tracking and support", body: "After dispatch, tracking details are shared on the contact method provided with your order. For help, contact StarkVibe with your order number and registered phone or email." },
  ]} />;
}
