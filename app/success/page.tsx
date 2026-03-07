import SuccessClient from "./success_client";

type Locale = "en" | "ar";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; session_id?: string }>;
}) {
  const { lang, session_id } = await searchParams;

  const normalizedLang = (lang ?? "").toLowerCase();
  const locale: Locale = normalizedLang.startsWith("ar") ? "ar" : "en";

  return <SuccessClient locale={locale} sessionId={session_id} />;
}