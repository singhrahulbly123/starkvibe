import { CustomPrintingPage } from "@/components/custom-printing-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Printing for Every Occasion — StarkVibe",
  description:
    "Custom printed t-shirts, hoodies and polos for birthdays, office teams, anniversaries, events and personalised gifts.",
  path: "/custom-printing",
});

export default function CustomPrintingRoute() {
  return <CustomPrintingPage page="overview" />;
}
