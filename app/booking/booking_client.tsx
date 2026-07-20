"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import LangDropdown from "@/app/components/lang-dropdown";

type Locale = "en" | "ar" | "es";

interface BookingClientProps {
  locale: Locale;
}

/* ---------------- Copy ---------------- */

const SLOTS = {
  morning:   { en: "Early Morning", ar: "الصباح الباكر", es: "Mañana temprana", time: "8am – 12pm"  },
  afternoon: { en: "Mid Afternoon",  ar: "منتصف النهار",  es: "Tarde",          time: "12pm – 4pm" },
  sunset:    { en: "Sunset",         ar: "الغروب",        es: "Atardecer",      time: "4pm – 8pm"  },
} as const;

type SlotKey = keyof typeof SLOTS;

const copy = {
  en: {
    title: "Booking",
    subtitle:
      "Choose your adventure date. After checkout, you’ll receive a confirmation + the Portal access link.",
    chooseTime: "Choose a time frame",
    timeNote: "Your walk takes 2–3 hours. This window simply lets our stops know when to expect you.",
    experienceTitle: "Choose Your Experience",
    exp1Name: "Experience Rainbow Street",
    exp1Desc: "A 7-stop culinary walk through Rainbow Street’s iconic cafés & eateries.",
    exp1Stops: "7 stops",
    exp2Name: "Experience Al Weibdeh",
    exp2Desc: "A 7-stop food adventure through the historic Al Weibdeh neighbourhood.",
    exp2Stops: "7 stops",
    exp2Soon: "Coming soon",
    includedTitle: "What's included",
    included: [
      "A curated interactive puzzle walk through the neighbourhood",
      "An assortment of tastings along the way",
      "Curated items from local shops",
      "A rewarding end to the adventure",
    ],
    nextStepsTitle: "Next steps",
    nextSteps: [
      "Complete checkout",
      "Receive confirmation email",
      "Get your Portal link + starting point",
      "Arrive and start solving",
    ],
    chooseDate: "Choose a date",
    qty: "Guests",
    discount: "Discount code",
    apply: "Apply",
    summary: "Order summary",
    subtotal: "Subtotal",
    total: "Total",
    pay: "Proceed to Payment",
    loading: "Redirecting…",
    toggle: "AR",
    currency: "JOD",
    home: "Home",
    portal: "Go to Portal",
    freeCodeApplied: "Free booking code applied",
    halfOffApplied: "50% discount applied",
  },
  ar: {
    title: "الحجز",
    subtitle:
      "اختر تاريخ التجربة. بعد الدفع ستصلك رسالة تأكيد + رابط الدخول إلى البوابة.",
    chooseTime: "اختر الوقت المناسب",
    timeNote: "تستغرق الجولة ٢–٣ ساعات. هذه النافذة الزمنية تُعلم محطاتنا بوقت زيارتك.",
    experienceTitle: "اختر تجربتك",
    exp1Name: "تجربة شارع الرينبو",
    exp1Desc: "جولة ذواقة من ٧ محطات عبر المقاهي والمطاعم الأيقونية في شارع الرينبو.",
    exp1Stops: "٧ محطات",
    exp2Name: "تجربة الويبدة",
    exp2Desc: "مغامرة طعام من ٧ محطات عبر حي الويبدة التاريخي.",
    exp2Stops: "٧ محطات",
    exp2Soon: "قريباً",
    includedTitle: "ماذا يشمل حجزك",
    included: [
      "جولة ألغاز تفاعلية منتقاة عبر الحي",
      "مجموعة من التذوقات على طول المسار",
      "منتجات مختارة من المحلات المحلية",
      "نهاية مجزية تُكلّل المغامرة",
    ],
    nextStepsTitle: "الخطوات التالية",
    nextSteps: [
      "إتمام الدفع",
      "استلام رسالة التأكيد",
      "الحصول على رابط البوابة + نقطة البداية",
      "الوصول والبدء بحل الألغاز",
    ],
    chooseDate: "اختر التاريخ",
    qty: "عدد الأشخاص",
    discount: "كود خصم",
    apply: "تطبيق",
    summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    total: "الإجمالي",
    pay: "الانتقال للدفع",
    loading: "جاري التحويل…",
    toggle: "ES",
    currency: "د.أ",
    home: "الرئيسية",
    portal: "الذهاب إلى البوابة",
    freeCodeApplied: "تم تطبيق كود الحجز المجاني",
    halfOffApplied: "تم تطبيق خصم ٥٠٪",
  },
  es: {
    title: "Reserva",
    subtitle:
      "Elige la fecha de tu experiencia. Tras el pago recibirás una confirmación + el enlace de acceso al Portal.",
    chooseTime: "Elige un horario",
    timeNote: "Tu recorrido dura 2–3 horas. Esta ventana simplemente avisa a nuestras paradas cuándo esperarte.",
    experienceTitle: "Elige tu Experiencia",
    exp1Name: "Experiencia Calle Rainbow",
    exp1Desc: "Un recorrido gastronómico de 7 paradas por los cafés y restaurantes de Rainbow Street.",
    exp1Stops: "7 paradas",
    exp2Name: "Experiencia Al Weibdeh",
    exp2Desc: "Una aventura culinaria de 7 paradas por el histórico barrio de Al Weibdeh.",
    exp2Stops: "7 paradas",
    exp2Soon: "Próximamente",
    includedTitle: "Qué incluye",
    included: [
      "Un recorrido interactivo de puzzles por el barrio",
      "Una selección de degustaciones en el camino",
      "Artículos seleccionados de tiendas locales",
      "Un final gratificante para la aventura",
    ],
    nextStepsTitle: "Próximos pasos",
    nextSteps: [
      "Completar el pago",
      "Recibir el correo de confirmación",
      "Obtener tu enlace al Portal + punto de inicio",
      "Llegar y empezar a resolver",
    ],
    chooseDate: "Elige una fecha",
    qty: "Participantes",
    discount: "Código de descuento",
    apply: "Aplicar",
    summary: "Resumen del pedido",
    subtotal: "Subtotal",
    total: "Total",
    pay: "Proceder al Pago",
    loading: "Redirigiendo…",
    toggle: "EN",
    currency: "JOD",
    home: "Inicio",
    portal: "Ir al Portal",
    freeCodeApplied: "Código de reserva gratuita aplicado",
    halfOffApplied: "Descuento del 50% aplicado",
  },
} as const;

/* ---------------- Helpers ---------------- */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/* ---------------- Component ---------------- */

export default function BookingClient({ locale }: BookingClientProps) {
  const effectiveLocale: Locale =
    locale === "ar" ? "ar" : locale === "es" ? "es" : "en";

  const isAr = effectiveLocale === "ar";
  const t = copy[effectiveLocale];

  const langParam = `lang=${effectiveLocale}`;
  const homeHref = `/?${langParam}`;
  const portalHref = `/portal?${langParam}`;

  /* ---------------- State ---------------- */

  const [experience, setExperience] = React.useState<"rainbow" | "weibdeh">(
    "rainbow"
  );

  const [timeSlot, setTimeSlot] = React.useState<SlotKey>("morning");

  const [date, setDate] = React.useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });

  const [qty, setQty] = React.useState(2);
  const [code, setCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [codeMessage, setCodeMessage] = React.useState("");

  const pricePerPerson = 28;

  const subtotal = Math.max(1, qty) * pricePerPerson;
  const total = clamp(subtotal - discount, 0, 999999);

  function applyCode() {
    const normalized = code.trim().toLowerCase();

    if (normalized === "zowarfree") {
      setDiscount(subtotal);
      setCodeMessage(t.freeCodeApplied);
    } else if (normalized === "halfzowar") {
      setDiscount(Math.floor(subtotal * 0.5));
      setCodeMessage(t.halfOffApplied);
    } else {
      setDiscount(0);
      setCodeMessage("");
    }
  }

  /* ---------------- Checkout ---------------- */

  async function startCheckout() {
    setLoading(true);

    try {
      // Free promo code path — bypass Stripe entirely
      if (total === 0) {
        const res = await fetch("/api/portal/free-unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: code.trim().toLowerCase() }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d?.error || "Invalid promo code.");
        }
        localStorage.setItem("zowar_unlocked", "1");
        const portalPath = experience === "weibdeh" ? "/portal/weibdeh" : "/portal";
        window.location.href = `${portalPath}?lang=${effectiveLocale}`;
        return;
      }

      // Paid path — custom checkout session (carries date, timeSlot, qty, experience metadata)
      const normalized = code.trim().toLowerCase();
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          timeSlot,
          qty,
          locale: effectiveLocale,
          experience,
          halfOff: normalized === "halfzowar",
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error || "Checkout failed. Please try again.");
      }
      const { url } = await res.json() as { url?: string };
      if (!url) throw new Error("No checkout URL returned.");
      window.location.href = url;
    } catch (e: unknown) {
      const err = e as { message?: string };
      alert(err?.message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  /* ---------------- Styles ---------------- */

  const pageBg = "min-h-screen text-neutral-900 z-page-bg";

  const glassCard =
    "rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]";

  const subtleBtn =
    "rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/[0.03]";

  const inputClass =
    "mt-2 block w-full max-w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-z-orange";

  const experienceCardBase =
    "relative rounded-2xl border p-4 text-start transition";

  const experienceImageClass =
    "relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm sm:h-28 sm:w-28";

  /* ---------------- Render ---------------- */

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={pageBg}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Link href={homeHref} className="mt-1 inline-flex">
              <Image
                src="/logo.png"
                alt="ZOWAR logo"
                width={96}
                height={96}
                priority
              />
            </Link>

            <div>
              <h1 className="text-3xl font-semibold">{t.title}</h1>

              <p className="mt-2 max-w-2xl text-neutral-600">
                {t.subtitle}
              </p>

              <div className="mt-3">
                <Link
                  href={portalHref}
                  className="text-sm font-medium underline decoration-black/20 hover:decoration-black/40"
                >
                  {t.portal}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LangDropdown
              locale={effectiveLocale}
              basePath="/booking"
              isRtl={isAr}
            />

            <Link href={homeHref} className={subtleBtn}>
              {t.home}
            </Link>
          </div>
        </div>

        {/* Experience Selector */}

        <div className={`mt-8 ${glassCard} p-6`}>
          <div className="text-base font-semibold">{t.experienceTitle}</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {/* Rainbow Street */}

            <button
              type="button"
              onClick={() => setExperience("rainbow")}
              className={`${experienceCardBase} ${
                experience === "rainbow"
                  ? "border-z-orange bg-z-orange-soft"
                  : "border-black/10 bg-white hover:bg-black/[0.02]"
              }`}
            >
              {experience === "rainbow" && (
                <div className="absolute end-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-z-orange">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              )}

              <div className="flex items-center gap-4 pe-6">
                <div className={experienceImageClass}>
                  <Image
                    src="/Rainbow.png"
                    alt="Rainbow Street"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-neutral-950">
                    {t.exp1Name}
                  </div>

                  <div className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {t.exp1Desc}
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-full border border-z-orange bg-z-orange-soft px-2.5 py-0.5 text-xs font-semibold z-orange">
                    {t.exp1Stops}
                  </div>
                </div>
              </div>
            </button>

            {/* Al Weibdeh */}

            <button
              type="button"
              onClick={() => setExperience("weibdeh")}
              className={`${experienceCardBase} ${
                experience === "weibdeh"
                  ? "border-z-orange bg-z-orange-soft"
                  : "border-black/10 bg-white hover:bg-black/[0.02]"
              }`}
            >
              {experience === "weibdeh" && (
                <div className="absolute end-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-z-orange">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              )}

              <div className="flex items-center gap-4 pe-6">
                <div className={experienceImageClass}>
                  <Image
                    src="/Weibdeh.png"
                    alt="Al Weibdeh"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-neutral-950">
                    {t.exp2Name}
                  </div>

                  <div className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {t.exp2Desc}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center rounded-full border border-z-orange bg-z-orange-soft px-2.5 py-0.5 text-xs font-semibold z-orange">
                      {t.exp2Stops}
                    </div>

                    <span className="text-xs text-neutral-400">
                      {t.exp2Soon}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* What's included */}
        <div className={`mt-6 ${glassCard} p-6`}>
          <div className="text-base font-semibold">{t.includedTitle}</div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.included.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-z-orange-soft">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 z-orange" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Layout */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Left Card */}

          <section className={`${glassCard} overflow-hidden p-6`}>
            <div className="text-base font-semibold">{t.nextStepsTitle}</div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {t.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="bg-z-orange mt-1 h-2 w-2 rounded-full" />
                  {step}
                </li>
              ))}
            </ul>

            <div className="mt-6 min-w-0 overflow-hidden">
              <label className="text-sm text-neutral-600">
                {t.chooseDate}
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-neutral-700">{t.chooseTime}</label>
              <p className="mt-0.5 text-xs text-neutral-400">{t.timeNote}</p>
              <div className="mt-3 flex flex-col gap-2">
                {(Object.keys(SLOTS) as SlotKey[]).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                      timeSlot === slot
                        ? "border-z-orange bg-z-orange-soft"
                        : "border-black/10 bg-white hover:bg-black/[0.02]"
                    }`}
                  >
                    <span className={`font-medium ${timeSlot === slot ? "z-orange" : "text-neutral-800"}`}>
                      {SLOTS[slot][effectiveLocale === "ar" ? "ar" : effectiveLocale === "es" ? "es" : "en"]}
                    </span>
                    <span className="text-neutral-400">{SLOTS[slot].time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-neutral-600">{t.qty}</label>

              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className={inputClass}
              />
            </div>

            <div className="mt-6">
              <label className="text-sm text-neutral-600">{t.discount}</label>

              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="ENTER PROMO"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-z-orange"
                />

                <button
                  type="button"
                  onClick={applyCode}
                  className="border-z-orange text-z-orange hover:bg-z-orange-soft rounded-2xl border px-4 py-3 text-sm font-medium"
                >
                  {t.apply}
                </button>
              </div>

              {codeMessage && (
                <p className="text-z-orange mt-2 text-sm font-medium">
                  {codeMessage}
                </p>
              )}
            </div>
          </section>

          {/* Order Summary */}

          <aside className={`${glassCard} p-6`}>
            <div className="text-base font-semibold">{t.summary}</div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span>
                  {subtotal} {t.currency}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>
                    -{discount} {t.currency}
                  </span>
                </div>
              )}

              <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
                <span>{t.total}</span>

                <span className="text-z-orange">
                  {total} {t.currency}
                </span>
              </div>
            </div>

            <button
              onClick={startCheckout}
              disabled={loading}
              className="bg-z-orange glow-z-orange mt-6 w-full rounded-2xl px-5 py-4 font-semibold text-neutral-950 disabled:opacity-60"
            >
              {loading ? t.loading : t.pay}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}