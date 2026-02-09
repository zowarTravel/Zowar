import BookingClient from "./booking_client";

type Locale = "en" | "ar";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;

  const normalizedLang = (lang ?? "").toLowerCase();
  const locale: Locale = normalizedLang.startsWith("ar") ? "ar" : "en";

  return <BookingClient locale={locale} />;
}
