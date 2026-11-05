import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Umami Cloud analytics (public IDs, not secrets).
const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
const UMAMI_WEBSITE_ID = "d1ece62b-7d62-4a79-939d-994d876f8d76";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zowar.net"),
  title: {
    default: "Zowar | Self-Guided Food & Puzzle Experience in Amman",
    template: "%s | Zowar",
  },
  description:
    "Explore Amman's iconic Rainbow Street on a self-guided food and puzzle adventure. Discover local restaurants, solve clues, and taste Jordanian flavors. From 25 JOD per person.",
  openGraph: {
    type: "website",
    siteName: "Zowar",
    locale: "en_US",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zowarjo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src={UMAMI_SCRIPT_URL}
          data-website-id={UMAMI_WEBSITE_ID}
          data-domains="zowar.net,www.zowar.net"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
