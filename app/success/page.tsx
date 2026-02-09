import SuccessClient from "./success_client";

type Locale = "en" | "ar";

export default function SuccessPage({
  searchParams,
}: {
  searchParams?: { lang?: string; session_id?: string };
}) {
  const normalizedLang = (searchParams?.lang ?? "").toLowerCase();
  const locale: Locale = normalizedLang === "ar" ? "ar" : "en";
  const sessionId = searchParams?.session_id;

  return <SuccessClient locale={locale} sessionId={sessionId} />;
}
