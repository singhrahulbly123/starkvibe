import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Returns Policy — StarkVibe", description: "Read StarkVibe guidance for returns, exchanges and custom print issues, including order checks, size selection and production concerns. Review the policy", path: "/returns-policy" });

export default function ReturnsPolicyPage() {
  return <LegalPage title="Returns policy." intro="TODO: Add the confirmed returns or exchange window and conditions." sections={[
    { title: "Returns and exchanges", body: "TODO: Add the confirmed returns or exchange window and conditions." },
    { title: "Custom printed products", body: "TODO: Add the confirmed return conditions for personalised, printed and made-to-order products." },
    { title: "Size and colour", body: "Please use the size guide and confirm colour, quantity and size breakdown before production. TODO: Add any confirmed size or colour conditions." },
    { title: "How to contact us", body: "TODO: Confirm the domain email and return-instruction process." },
  ]} />;
}
