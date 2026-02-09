"use client";
import { useSearchParams } from "next/navigation";
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
  },
} as const;

/** ---------- Date utils (no external libs) ---------- */
function daysInMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}
function firstDayOfMonth(year: number, monthIndex0: number) {
  // 0 = Sunday
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
    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
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

/** ---------- Calendar component styled like ref 1 ---------- */
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
  const blanks = (first + 6) % 7; // Monday-first like your reference

  const weekLabels = isAr
    ? ["ن", "ث", "ر", "خ", "ج", "س", "ح"] // Mon..Sun (approx)
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

  // Availability rule (v1): today and future are available
  function isAvailable(iso: string) {
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return false;
    d.setHours(0, 0, 0, 0);
    return d.getTime() >= today.getTime();
  }

  const selectedIso = value;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          aria-label="Previous month"
          type="button"
        >
          {isAr ? "›" : "‹"}
        </button>

        <div className="text-sm font-semibold tracking-tight">
          {formatMonth(locale, year, month)}
        </div>

        <button
          onClick={nextMonth}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          aria-label="Next month"
          type="button"
        >
          {isAr ? "‹" : "›"}
        </button>
      </div>

      {/* Week labels */}
      <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-white/50">
        {weekLabels.map((w) => (
          <div key={w} className="text-center">
            {w}
          </div>
        ))}
      </div>

      {/* Days grid (minimal style) */}
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

          // Styles to match your reference:
          // - Most dates faded
          // - Available dates bold
          // - Only "today" has a subtle bubble
          // - Selected date turns orange
          const base =
            "h-10 w-full rounded-2xl text-center text-sm transition select-none";

          const faded = "text-white/35";
          const availableText = "text-white/85 font-semibold hover:text-white";

          const todayBubble = isToday && !isSelected ? "bg-white/10" : "bg-transparent";
          const selectedBubble =
            isSelected ? "bg-orange-500 text-neutral-950 font-semibold" : "";

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
                isSelected
                  ? selectedBubble
                  : available
                    ? `${availableText} ${todayBubble}`
                    : faded,
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
  const sp = useSearchParams();
  const langQP = (sp.get("lang") ?? "").toLowerCase();

  const effectiveLocale: Locale =
    langQP.startsWith("ar") ? "ar" : locale === "ar" ? "ar" : "en";

  const isAr = effectiveLocale === "ar";
  const t = copy[effectiveLocale];
  // default = tomorrow
  const [date, setDate] = React.useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });

  const [qty, setQty] = React.useState<number>(2);
  const [loading, setLoading] = React.useState(false);

  const [code, setCode] = React.useState("");
  const [discount, setDiscount] = React.useState<number>(0);

  // Price display (keep consistent with /api/checkout)
  const pricePerPerson = 25; // JOD
  const rawSubtotal = Math.max(1, qty) * pricePerPerson;
  const subtotal = rawSubtotal;
  const total = clamp(subtotal - discount, 0, 999999);

  function applyCode() {
    // simple v1 demo — replace with real validation later
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
          locale,
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

  return (
    <main
  className="min-h-screen text-white"
  style={{ backgroundColor: "#3F4351" }}
>

      <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Top bar */}
<div className="flex flex-wrap items-start justify-between gap-4">
  {/* Logo + title */}
  <div className="flex items-start gap-4">
 <Link
  href="/"
  aria-label="Go to home"
  className="mt-1 inline-flex"
>
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
      <p className="mt-2 max-w-2xl text-white/70">{t.subtitle}</p>
    </div>
  </div>

  {/* Actions */}
  <div className="flex gap-2">
    <a
      href={`/booking?lang=${isAr ? "en" : "ar"}`}
      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
    >
      {t.toggle}
    </a>
    <a
      href="/"
      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
    >
      {isAr ? "الرئيسية" : "Home"}
    </a>
  </div>
</div>

        {/* Two-column layout */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* LEFT: patterned panel + next steps + calendar */}
          <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6">
            {/* “fun background” like ref 2 (abstract shapes) */}
           <div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 opacity-100"
  style={{
    backgroundImage:
      "url(/images/booking/bg-left.png), radial-gradient(600px 400px at 15% 35%, rgba(255,165,0,0.20), transparent 55%)",
    backgroundSize: "cover, auto",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
  }}
/>
            {/* soft pattern overlay */}
   <div className="pointer-events-none absolute inset-0">
  <Image
    src="/images/booking/bg-left.webp"
    alt=""
    fill
    className="object-cover opacity-90"
    priority
  />
</div>

            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
                <div className="text-sm font-semibold">{t.nextStepsTitle}</div>
                <ul className="mt-3 grid gap-2 text-sm text-white/75">
                  {t.nextSteps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-orange-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold">{t.chooseDate}</div>
                    <div className="mt-1 text-sm text-white/70">{t.hint}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm">
                    {date}
                  </div>
                </div>

                <div className="mt-4">
                  <CalendarPicker locale={locale} value={date} onChange={setDate} />
                </div>

                <div className="mt-6 grid gap-2">
                  <label className="text-sm text-white/70">{t.qty}</label>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-orange-400/60"
                  />
                  <p className="text-xs text-white/50">
                    {isAr ? "السعر للشخص" : "Price per person"}: {pricePerPerson}{" "}
                    {isAr ? "د.أ" : "JOD"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: order summary (like ref 1) */}
          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="text-base font-semibold">{t.summary}</div>

            {/* line item */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <div className="flex items-center gap-3">
                <ProductIcon />
                <div>
                  <div className="text-sm font-semibold">
                    {isAr ? "تجربة ZOWAR" : "ZOWAR Experience"}
                  </div>
                  <div className="text-xs text-white/60">
                    {isAr ? "تاريخ" : "Date"}: {date} • {isAr ? "عدد" : "Qty"}:{" "}
                    {Math.max(1, qty)}
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold">
                {subtotal} {t.currency}
              </div>
            </div>

            {/* discount */}
            <div className="mt-4 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.discount}
                className="flex-1 rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-orange-400/60"
              />
              <button
                type="button"
                onClick={applyCode}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10"
              >
                {t.apply}
              </button>
            </div>

            {/* totals */}
            <div className="mt-6 grid gap-2 rounded-2xl border border-white/10 bg-neutral-900 p-4 text-sm">
              <div className="flex items-center justify-between text-white/75">
                <span>{t.subtotal}</span>
                <span>
                  {subtotal} {t.currency}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-white/75">
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

            {/* pay */}
            <button
              onClick={startCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-neutral-950 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t.loading : t.pay}
            </button>

            <p className="mt-3 text-xs text-white/50">
              {isAr
                ? "المعاملات آمنة ومشفّرة."
                : "All transactions are secure and encrypted."}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
