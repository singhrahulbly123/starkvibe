import type { Metadata } from "next";
import { CustomPrintingPage } from "@/components/custom-printing-page";

export const metadata: Metadata = {
  title: "Personalised Custom Printed Gifts — StarkVibe",
  description:
    "Give personalised cotton t-shirts, polos, sweatshirts and hoodies made for birthdays, family, friends and special occasions.",
};

export default function GiftingPrintingRoute() {
  return <CustomPrintingPage page="gifting" />;
}
