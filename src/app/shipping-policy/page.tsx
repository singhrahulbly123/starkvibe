import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Shipping Policy — StarkVibe", description: "Read StarkVibe shipping guidance covering order processing, delivery details, custom and bulk production, tracking and support for each order. Plan ahead.", path: "/shipping-policy" });

export default function ShippingPolicyPage() {
  return <LegalPage title="Shipping policy." intro="TODO: Add the confirmed delivery days, shipping charge and free-shipping threshold." sections={[
    { title: "Delivery timeline", body: "TODO: Add the confirmed delivery days and any conditions that affect delivery." },
    { title: "Shipping charges", body: "TODO: Add the confirmed shipping charge and free-shipping threshold." },
    { title: "Custom and bulk orders", body: "TODO: Add the confirmed custom-order turnaround and any delivery conditions." },
    { title: "Tracking and support", body: "TODO: Confirm the support contact details and tracking process." },
  ]} />;
}
