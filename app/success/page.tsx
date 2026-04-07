import type { Metadata } from "next";
import SuccessClient from "./success_client";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

type Locale = "en" | "ar" | "es";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; session_id?: string }>;
}) {
  const { lang, session_id } = await searchParams;

  const normalizedLang = (lang ?? "").toLowerCase();
  const locale: Locale = normalizedLang.startsWith("ar") ? "ar" : normalizedLang.startsWith("es") ? "es" : "en";

  return <SuccessClient locale={locale} sessionId={session_id} />;
}