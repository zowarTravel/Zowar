import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://zowar.jo"),
  title: {
    default: "Zowar | Food Puzzle Walks in Amman",
    template: "%s | Zowar",
  },
  description:
    "Zowar offers self-guided food puzzle walks in Amman, Jordan. Explore local restaurants, solve clues, and taste your way through the city.",
  openGraph: {
    type: "website",
    siteName: "Zowar",
    locale: "en_US",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0b0b] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
