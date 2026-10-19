import type { Metadata } from "next";
import type { Locale } from "../riddlecontent";
import PortalFlow from "../portal_flow";
import { PortalGate } from "../portal_gate";

export const metadata: Metadata = {
  title: "Puzzle Portal – Rainbow Street Highlights",
  robots: { index: false, follow: false },
};

export default async function HighlightsPortalPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale: Locale = lang === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <main dir={dir} className="mx-auto w-full max-w-3xl px-4 py-6">
      <PortalGate locale={locale} experience="highlights">
        <PortalFlow locale={locale} routeId="highlights" />
      </PortalGate>
    </main>
  );
}
