import type { Metadata } from "next";
import { CustomPrintingPage } from "@/components/custom-printing-page";

export const metadata: Metadata = {
  title: "Custom Printing for Every Occasion — StarkVibe",
  description:
    "Custom printed t-shirts, hoodies and polos for birthdays, office teams, anniversaries, events and personalised gifts.",
};

export default function CustomPrintingRoute() {
  return <CustomPrintingPage page="overview" />;
}
