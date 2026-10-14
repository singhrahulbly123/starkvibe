import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Political Campaign T-Shirts & Bulk Merchandise — StarkVibe",
  description:
    "Custom printed t-shirts, polos and hoodies for campaign teams, volunteers, public events and community programmes.",
  path: "/custom-printing/political-campaigns",
});

export default function PoliticalCampaignPrintingRoute() {
  return <CustomPrintingPage page="political-campaigns" />;
}
