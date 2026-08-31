import type { Metadata } from "next";
import BookingClient from "./booking_client";

export const metadata: Metadata = {
  title: "Book the Rainbow Street Experience – From 30 JOD per Person",
  description:
    "Book your self-guided food and puzzle walk on Rainbow Street, Amman. Pick a date, pay securely, and unlock the Puzzle Portal. Over 25 JOD in tastings and gifts included.",
  alternates: {
    canonical: "https://zowar.net/booking",
    languages: {
      "x-default": "https://zowar.net/booking",
      en: "https://zowar.net/booking?lang=en",
      ar: "https://zowar.net/booking?lang=ar",
      es: "https://zowar.net/booking?lang=es",
    },
  },
  openGraph: {
    title: "Book the Rainbow Street Experience – Zowar, Amman",
    description:
      "Self-guided food and puzzle walk on Rainbow Street. 7 curated stops, 3–4 hours, over 25 JOD in tastings and gifts. Pick a date and book securely.",
    url: "https://zowar.net/booking",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
}; type Locale = "en" | "ar" | "es"; export default async function BookingPage({ searchParams, }: { searchParams: Promise<{ lang?: string }>; }) { const { lang } = await searchParams; const normalizedLang = (lang ?? "").toLowerCase(); const locale: Locale = normalizedLang.startsWith("ar") ? "ar" : normalizedLang.startsWith("es") ? "es" : "en"; return <BookingClient locale={locale} />; }