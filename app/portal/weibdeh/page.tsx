import { PortalGate } from "../portal_gate";
import PortalFlowWeibdeh from "./portal_flow_weibdeh";

export default async function WeibdehPortalPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = lang === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <main dir={dir} className="mx-auto w-full max-w-3xl px-4 py-6">
      <PortalGate locale={locale}>
        <PortalFlowWeibdeh locale={locale} />
      </PortalGate>
    </main>
  );
}
