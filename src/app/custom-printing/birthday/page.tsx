import type { Metadata } from "next";
import { CustomPrintingPage } from "@/components/custom-printing-page";

export const metadata: Metadata = {
  title: "Custom Birthday T-Shirts & Hoodies — StarkVibe",
  description:
    "Create custom birthday t-shirts, hoodies and group outfits for friends, family and party celebrations.",
};

export default function BirthdayPrintingRoute() {
  return <CustomPrintingPage page="birthday" />;
}
