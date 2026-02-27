"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Locale = "en" | "ar";

interface BookingClientProps {
  locale: Locale;
}

/* ---------------- Copy ---------------- */

const copy = {
  en: {
    title: "Booking",
    subtitle:
      "Choose your adventure date. After checkout, you’ll receive a confirmation + the Portal access link.",
    nextStepsTitle: "Next steps",
    nextSteps: [
      "Complete checkout",
      "Receive confirmation email",
      "Get your Portal link + starting point",
      "Arrive and start solving",
    ],
    chooseDate: "Choose a date",
    hint: "Pick the day you want to start the experience.",
    qty: "Guests",
    discount: "Discount code",
    apply: "Apply",
    summary: "Order summary",
    subtotal: "Subtotal",
    total: "Total",
    pay: "Proceed to Payment",
    loading: "Redirecting to Stripe…",
    toggle: "AR",
    currency: "JOD",
    home: "Home",
    portal: "Go to Portal",
  },
  ar: {
    title: "الحجز",
    subtitle:
      "اختر تاريخ التجربة. بعد الدفع ستصلك رسالة تأكيد + رابط الدخول إلى البوابة.",
    nextStepsTitle: "الخطوات التالية",
    nextSteps: [
      "إتمام الدفع",
      "استلام رسالة التأكيد",
      "الحصول على رابط البوابة + نقطة البداية",
      "الوصول والبدء بحل الألغاز",
    ],
    chooseDate: "اختر التاريخ",
    hint: "اختر اليوم الذي تريد بدء التجربة فيه.",
    qty: "عدد الأشخاص",
    discount: "كود خصم",
    apply: "تطبيق",
    summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    total: "الإجمالي",
    pay: "الانتقال للدفع",
    loading: "جاري التحويل إلى Stripe…",
    toggle: "EN",
    currency: "د.أ",
    home: "الرئيسية",
    portal: "الذهاب إلى البوابة",
  },
} as const;

/* ---------------- Helpers ---------------- */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/* ---------------- Component ---------------- */

export default function BookingClient({ locale }: BookingClientProps) {
  const effectiveLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = effectiveLocale === "ar";
  const t = copy[effectiveLocale];

  const langParam = `lang=${effectiveLocale}`;
  const toggleHref = `/booking?lang=${isAr ? "en" : "ar"}`;
  const homeHref = `/?${langParam}`;
  const portalHref = `/portal?${langParam}`;

  /* ---------------- State ---------------- */

  const [date, setDate] = React.useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });

  const [qty, setQty] = React.useState<number>(2);
  const [code, setCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const pricePerPerson = 25;
  const subtotal = Math.max(1, qty) * pricePerPerson;
  const total = clamp(subtotal - discount, 0, 999999);

  function applyCode() {
    const normalized = code.trim().toLowerCase();
    if (normalized === "zowar10") setDiscount(10);
    else if (normalized === "zowar5") setDiscount(5);
    else setDiscount(0);
  }

  async function startCheckout() {
    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: effectiveLocale,
          date,
          qty: Math.max(1, qty),
          code: code.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Checkout failed");

      if (data.free) {
        localStorage.setItem("zowar_unlocked", "1");
        window.location.href = portalHref;
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Checkout failed");
    } catch (e: any) {
      alert(e?.message ?? "Something went wrong.");
      setLoading(false);
    }
  }

  /* ---------------- Styles ---------------- */

  const pageBg =
    "min-h-screen text-neutral-900 bg-[radial-gradient(900px_600px_at_18%_24%,rgba(255,137,54,0.18),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.06),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)]";

  const glassCard =
    "rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]";

  const subtleBtn =
    "rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/[0.03]";

  /* ---------------- Render ---------------- */

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={pageBg}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Link href={homeHref} aria-label="Go to home" className="mt-1 inline-flex">
              <Image
                src="/logo.png"
                alt="ZOWAR logo"
                width={72}
                height={72}
                priority
                className="opacity-95 transition-transform duration-200 ease-out hover:opacity-100 hover:-translate-y-[2px] hover:rotate-[-1deg] hover:scale-[1.02]"
              />
            </Link>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
              <p className="mt-2 max-w-2xl text-neutral-600">{t.subtitle}</p>

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

          <div className="flex gap-2">
            <Link href={toggleHref} className={subtleBtn}>
              {t.toggle}
            </Link>
            <Link href={homeHref} className={subtleBtn}>
              {t.home}
            </Link>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left */}
          <section className={`${glassCard} p-6`}>
            <div className="text-base font-semibold">{t.nextStepsTitle}</div>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {t.nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#ff8936]" />
                  {step}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <label className="text-sm text-neutral-600">{t.chooseDate}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
              />
            </div>

            <div className="mt-6">
              <label className="text-sm text-neutral-600">{t.qty}</label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
              />
            </div>
          </section>

          {/* Right */}
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

              <div className="flex justify-between font-semibold text-base">
                <span>{t.total}</span>
                <span>
                  {total} {t.currency}
                </span>
              </div>
            </div>

            <button
              onClick={startCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-[#ff8936] px-5 py-4 font-semibold text-neutral-950 hover:opacity-95 disabled:opacity-60"
            >
              {loading ? t.loading : t.pay}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}