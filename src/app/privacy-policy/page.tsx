import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy — StarkVibe", description: "How StarkVibe collects, uses and protects customer information." };

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy policy." intro="We keep customer information limited to what is needed to process orders, answer enquiries and improve your experience with StarkVibe." sections={[
    { title: "Information we collect", body: "We may collect your name, email address, phone or WhatsApp number, delivery address, order details, size and colour selections, uploaded artwork and messages you send to us." },
    { title: "How we use it", body: "Information is used to process orders, prepare quotations, confirm custom printing details, arrange delivery, provide support and send important order updates. We do not sell customer information." },
    { title: "Payments and security", body: "Payment and order details are handled through the services used for your order. We take reasonable steps to protect information, but no online transmission can be guaranteed to be completely secure." },
    { title: "Your choices", body: "You can ask us to correct or delete personal information where legally and operationally possible. Contact us at singhrahulbly123@gmail.com for privacy requests." },
  ]} />;
}
