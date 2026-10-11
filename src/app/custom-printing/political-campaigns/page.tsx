import type { Metadata } from "next";
import { CustomPrintingPage } from "@/components/custom-printing-page";

export const metadata: Metadata = {
  title: "Political Campaign T-Shirts & Bulk Merchandise — StarkVibe",
  description:
    "Custom printed t-shirts, polos and hoodies for campaign teams, volunteers, public events and community programmes.",
};

export default function PoliticalCampaignPrintingRoute() {
  return <CustomPrintingPage page="political-campaigns" />;
}
