import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { SiteAnalytics } from "@/components/site-analytics";

const shoulders = localFont({
  src: "./fonts/big-shoulders-latin.woff2",
  weight: "100 900",
  variable: "--font-shoulders",
  display: "swap",
  adjustFontFallback: false,
});
const hanken = localFont({
  src: "./fonts/hanken-grotesk-latin.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
});
export const metadata: Metadata = {
  title: "StarkVibe — Heavy Cotton. Honest Finish.",
  metadataBase: new URL("https://starkvibe.com"),
  alternates: { canonical: "/" },
  description:
    "Premium 100% cotton tees, polos, sweatshirts and hoodies from 180 to 350 GSM. Shop everyday fits and custom printing for birthdays, events and teams.",
  keywords: [
    "premium cotton t-shirts India",
    "custom printed t-shirts",
    "bulk teamwear India",
    "180 GSM cotton tee",
    "350 GSM fleece hoodie",
    "StarkVibe",
  ],
  openGraph: {
    type: "website",
    siteName: "StarkVibe",
    title: "StarkVibe — Premium Cotton Wear",
    description:
      "Premium cotton tees, polos, sweatshirts and hoodies with custom printing for events, teams and gifting.",
    url: "https://starkvibe.com",
    locale: "en_IN",
    images: [
      {
        url: "/branding/starkvibe-wordmark-premium.png",
        width: 1200,
        height: 630,
        alt: "StarkVibe premium cotton wear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StarkVibe — Premium Cotton Wear",
    description:
      "Premium cotton tees, polos, sweatshirts and hoodies with custom printing.",
    images: ["/branding/starkvibe-wordmark-premium.png"],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1efe8",
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StarkVibe",
  url: "https://starkvibe.com",
  logo: "https://starkvibe.com/branding/starkvibe-wordmark-premium.png",
  email: "singhrahulbly123@gmail.com",
  telephone: "+91-7060421033",
  areaServed: { "@type": "Country", name: "India" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+91-7060421033",
    email: "singhrahulbly123@gmail.com",
    availableLanguage: ["English", "Hindi"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${shoulders.variable} ${hanken.variable} font-sans antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <Suspense fallback={null}>
          <SiteAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
