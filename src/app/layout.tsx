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
  metadataBase: new URL("https://starkvibe.com"),
  openGraph: {
    siteName: "StarkVibe",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${shoulders.variable} ${hanken.variable} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <SiteAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
