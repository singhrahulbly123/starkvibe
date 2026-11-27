import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import Script from "next/script";
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
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${shoulders.variable} ${hanken.variable} font-sans antialiased`}
      >
        <Script id="starkvibe-meta-pixel" strategy="beforeInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1479258844180263');fbq('track','PageView');`}</Script>
        <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1479258844180263&ev=PageView&noscript=1" alt="" /></noscript>
        <Suspense fallback={null}>
          <SiteAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
