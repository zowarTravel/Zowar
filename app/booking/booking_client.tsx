"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Locale = "en" | "ar";

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
  },
  ar: {
    title: "الحجز",
    subtitle: "اختر تاريخ التجربة. بعد الدفع ستصلك رسالة تأكيد + رابط الدخول إلى البوابة.",
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
  },
} as const;

/** ---------- Date utils (no external libs) ---------- */
function daysInMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}
function firstDayOfMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0, 1).getDay();
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function isoDate(year: number, monthIndex0: number, day: number) {
  return `${year}-${pad2(monthIndex0 + 1)}-${pad2(day)}`;
}
function formatMonth(locale: Locale, year: number, monthIndex0: number) {
  const d = new Date(year, monthIndex0, 1);
  try {
    return d.toLocaleString(locale === "ar" ? "ar" : "en", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return `${year}-${pad2(monthIndex0 + 1)}`;
  }
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** ---------- Product thumbnail (checkout item) ---------- */
function ProductIcon() {
  return (
    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-black/10 bg-white">
      <Image
        src="/images/booking/item.webp"
        alt="ZOWAR Experience"
        fill
        className="object-cover"
        sizes="40px"
      />
    </div>
  );
}

/** ---------- Calendar component ---------- */
function CalendarPicker({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: string; // YYYY-MM-DD
  onChange: (next: string) => void;
}) {
  const isAr = locale === "ar";

  const initial = React.useMemo(() => {
    const d = value ? new Date(value + "T00:00:00") : new Date();
    if (Number.isNaN(d.getTime())) return new Date();
    return d;
  }, [value]);

  const [year, setYear] = React.useState(initial.getFullYear());
  const [month, setMonth] = React.useState(initial.getMonth());

  React.useEffect(() => {
    const d = value ? new Date(value + "T00:00:00") : null;
    if (!d || Number.isNaN(d.getTime())) return;
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }, [value]);

  const today = React.useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const todayIso = React.useMemo(
    () => isoDate(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  );

  const dim = daysInMonth(year, month);
  const first = firstDayOfMonth(year, month); // 0 Sunday
  const blanks = (first + 6) % 7; // Monday-first

  const weekLabels = isAr
    ? ["ن", "ث", "ر", "خ", "ج", "س", "ح"]
    : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  function prevMonth() {
    const m = month - 1;
    if (m < 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth(m);
  }

  function nextMonth() {
    const m = month + 1;
    if (m > 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth(m);
  }

  function isAvailable(iso: string) {
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return false;
    d.setHours(0, 0, 0, 0);
    return d.getTime() >= today.getTime();
  }

  const selectedIso = value;

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/[0.03]"
          aria-label="Previous month"
          type="button"
        >
          {isAr ? "›" : "‹"}
        </button>

        <div className="text-sm font-semibold tracking-tight text-neutral-900">
          {formatMonth(locale, year, month)}
        </div>

        <button
          onClick={nextMonth}
          className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/[0.03]"
          aria-label="Next month"
          type="button"
        >
          {isAr ? "‹" : "›"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-neutral-500">
        {weekLabels.map((w) => (
          <div key={w} className="text-center">
            {w}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        {Array.from({ length: blanks }).map((_, i) => (
          <div key={`b-${i}`} />
        ))}

        {Array.from({ length: dim }).map((_, i) => {
          const day = i + 1;
          const iso = isoDate(year, month, day);

          const available = isAvailable(iso);
          const isSelected = iso === selectedIso;
          const isToday = iso === todayIso;

          const base = "h-10 w-full rounded-2xl text-center text-sm transition select-none";
          const faded = "text-neutral-400";
          const availableText = "text-neutral-900 font-semibold hover:bg-black/[0.03]";
          const todayBubble = isToday && !isSelected ? "bg-black/[0.04]" : "bg-transparent";
          const selectedBubble = isSelected ? "bg-[#ff8936] text-neutral-950 font-semibold" : "";
          const disabled = !available ? "cursor-not-allowed" : "cursor-pointer";

          return (
            <button
              key={iso}
              type="button"
              disabled={!available}
              onClick={() => onChange(iso)}
              className={[
                base,
                disabled,
                isSelected ? selectedBubble : available ? `${availableText} ${todayBubble}` : faded,
              ].join(" ")}
              aria-pressed={isSelected}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingClient({ locale }: { locale: Locale }) {
  const effectiveLocale: Locale = locale === "ar" ? "ar" : "en";
  const isAr = effectiveLocale === "ar";
  const t = copy[effectiveLocale];

  // ✅ preserve lang across nav
  const langParam = `lang=${effectiveLocale}`;
  const toggleHref = `/booking?lang=${isAr ? "en" : "ar"}`;
  const homeHref = `/?${langParam}`;
  const portalHref = `/portal?${langParam}`;

  const [date, setDate] = React.useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });

  const [qty, setQty] = React.useState<number>(2);
  const [loading, setLoading] = React.useState(false);

  const [code, setCode] = React.useState("");
  const [discount, setDiscount] = React.useState<number>(0);

  const pricePerPerson = 25; // JOD
  const subtotal = Math.max(1, qty) * pricePerPerson;
  const total = clamp(subtotal - discount, 0, 999999);

  function applyCode() {
    const normalized = code.trim().toLowerCase();
    if (!normalized) return setDiscount(0);

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
          discountCode: code.trim() || undefined,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (e: any) {
      alert(e?.message ?? "Something went wrong.");
      setLoading(false);
    }
  }

  const pageBg =
    "min-h-screen text-neutral-900 bg-[radial-gradient(900px_600px_at_18%_24%,rgba(255,137,54,0.18),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.06),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)]";

  const glassCard =
    "rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]";

  const subtleBtn =
    "rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/[0.03]";

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

              {/* Optional: quick portal shortcut */}
              <div className="mt-3">
                <Link href={portalHref} className="text-sm font-medium text-neutral-800 underline decoration-black/20 hover:decoration-black/40">
                  {isAr ? "الذهاب إلى البوابة" : "Go to Portal"}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={toggleHref} className={subtleBtn}>
              {t.toggle}
            </Link>
            <Link href={homeHref} className={subtleBtn}>
              {isAr ? "الرئيسية" : "Home"}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className={`${glassCard} relative overflow-hidden p-6`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(600px 400px at 15% 35%, rgba(255,165,0,0.20), transparent 55%)",
                backgroundSize: "auto",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
              <Image src="/images/booking/bg-left.webp" alt="" fill className="object-cover" priority />
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                <div className="text-sm font-semibold">{t.nextStepsTitle}</div>
                <ul className="mt-3 grid gap-2 text-sm text-neutral-700">
                  {t.nextSteps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-[#ff8936]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold">{t.chooseDate}</div>
                    <div className="mt-1 text-sm text-neutral-600">{t.hint}</div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-neutral-700">
                    {date}
                  </div>
                </div>

                <div className="mt-4">
                  <CalendarPicker locale={effectiveLocale} value={date} onChange={setDate} />
                </div>

                <div className="mt-6 grid gap-2">
                  <label className="text-sm text-neutral-600">{t.qty}</label>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-neutral-900 outline-none focus:border-[#ff8936]/60"
                  />
                  <p className="text-xs text-neutral-500">
                    {isAr ? "السعر للشخص" : "Price per person"}: {pricePerPerson} {isAr ? "د.أ" : "JOD"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className={`${glassCard} p-6`}>
            <div className="text-base font-semibold">{t.summary}</div>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <ProductIcon />
                <div>
                  <div className="text-sm font-semibold">{isAr ? "تجربة ZOWAR" : "ZOWAR Experience"}</div>
                  <div className="text-xs text-neutral-500">
                    {isAr ? "تاريخ" : "Date"}: {date} • {isAr ? "عدد" : "Qty"}: {Math.max(1, qty)}
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold">
                {subtotal} {t.currency}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.discount}
                className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-[#ff8936]/60"
              />
              <button
                type="button"
                onClick={applyCode}
                className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm hover:bg-black/[0.03]"
              >
                {t.apply}
              </button>
            </div>

            <div className="mt-6 grid gap-2 rounded-2xl border border-black/10 bg-white p-4 text-sm">
              <div className="flex items-center justify-between text-neutral-600">
                <span>{t.subtotal}</span>
                <span>
                  {subtotal} {t.currency}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-neutral-600">
                  <span>{isAr ? "خصم" : "Discount"}</span>
                  <span>
                    -{discount} {t.currency}
                  </span>
                </div>
              )}

              <div className="mt-2 flex items-center justify-between text-base font-semibold">
                <span>{t.total}</span>
                <span>
                  {total} {t.currency}
                </span>
              </div>
            </div>

            <button
              onClick={startCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-[#ff8936] px-5 py-4 font-semibold text-neutral-950 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t.loading : t.pay}
            </button>

            <p className="mt-3 text-xs text-neutral-500">
              {isAr ? "المعاملات آمنة ومشفّرة." : "All transactions are secure and encrypted."}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
