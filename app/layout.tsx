import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Zowar – Self-Guided Food & Puzzle Walk in Amman, Jordan",
    template: "%s | Zowar",
  },
  description:
    "Explore Amman's iconic Rainbow Street on a self-guided food and puzzle adventure. Discover local restaurants, solve clues, and taste Jordanian flavors. From 28 JOD per person.",
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
      </body>
    </html>
  );
}
