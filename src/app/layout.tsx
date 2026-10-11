import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  description:
    "Premium 100% cotton tees, polos and fleece. 180 to 350 GSM. Built heavy, finished honest. Discover the range and custom branding.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${shoulders.variable} ${hanken.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
