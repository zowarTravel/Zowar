import type { Metadata } from "next";
import BookingClient from "./booking_client";

export const metadata: Metadata = {
  title: "Book a Food Puzzle Walk",
  description:
    "Book your self-guided food puzzle walk in Amman. Pick a date, secure your spot, and unlock the Puzzle Portal.",
  alternates: {
    canonical: "https://zowar.jo/booking",
    languages: {
      en: "https://zowar.jo/booking?lang=en",
      ar: "https://zowar.jo/booking?lang=ar",
    },
  },
  openGraph: {
    title: "Book a Food Puzzle Walk in Amman",
    description:
      "Pick a date, secure your spot, and unlock the Puzzle Portal for your Zowar experience.",
    url: "https://zowar.jo/booking",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
}; type Locale = "en" | "ar"; export default async function BookingPage({ searchParams, }: { searchParams: Promise<{ lang?: string }>; }) { const { lang } = await searchParams; const normalizedLang = (lang ?? "").toLowerCase(); const locale: Locale = normalizedLang.startsWith("ar") ? "ar" : "en"; return <BookingClient locale={locale} />; }