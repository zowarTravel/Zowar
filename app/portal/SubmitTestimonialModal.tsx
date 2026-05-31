"use client";

import React from "react";
import { TRAVELER_TYPE_LABELS, type TravelerType } from "../testimonials_data";

type Locale = "en" | "ar";

type Props = {
  locale?: Locale;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

function getRecentMonths(): { value: string; label: string }[] {
  const now = new Date();
  const months: { value: string; label: string }[] = [];
  for (let i = 0; i < 8; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = d.toLocaleString("en-US", { month: "long", year: "numeric" });
    months.push({ value, label: value });
  }
  return months;
}

const TRAVELER_TYPES: TravelerType[] = ["couple", "friends", "solo", "local", "tourist"];

export default function SubmitTestimonialModal({ locale = "en", onClose }: Props) {
  const isAr = locale === "ar";
  const months = React.useMemo(getRecentMonths, []);

  const [name, setName] = React.useState("");
  const [travelerType, setTravelerType] = React.useState<TravelerType | "">("");
  const [month, setMonth] = React.useState(months[0].value);
  const [location, setLocation] = React.useState("");
  const [text, setText] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  /* Close on Escape */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || !travelerType) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/submit-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, travelerType, month, location, text, email, locale }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls = "mt-1.5 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-z-orange focus:ring-4 focus:ring-[rgba(200,105,74,0.12)]";
  const labelCls = "block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500";

  return (
    <>
      <style>{`
        @keyframes stm-backdrop { from { opacity:0; } to { opacity:1; } }
        @keyframes stm-sheet {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        style={{
          background: "rgba(12,10,8,0.72)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          animation: "stm-backdrop 220ms ease both",
        }}
        onClick={onClose}
      >
        <div
          dir={isAr ? "rtl" : "ltr"}
          role="dialog"
          aria-modal="true"
          className="w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_44px_90px_rgba(0,0,0,0.32)]"
          style={{ animation: "stm-sheet 320ms cubic-bezier(.22,1,.36,1) 60ms both" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-z-orange">
                {isAr ? "مشاركة التجربة" : "Share your experience"}
              </div>
              <div className="mt-0.5 text-base font-semibold text-neutral-900">
                {isAr ? "كيف كانت رحلتك؟" : "How was your journey?"}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition hover:bg-neutral-50 hover:text-neutral-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 pt-4">
            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mb-3 text-3xl">✦</div>
                <div className="text-base font-semibold text-neutral-900">
                  {isAr ? "شكراً لك!" : "Thank you!"}
                </div>
                <p className="mt-2 text-sm text-neutral-500">
                  {isAr
                    ? "وصلت مشاركتك — نقدّر وقتك ونراجع كل الردود بعناية."
                    : "Your review has been received. We read every submission carefully."}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-2xl bg-z-orange px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  {isAr ? "إغلاق" : "Close"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className={labelCls}>
                    {isAr ? "الاسم" : "First name"}
                    <span className="text-z-orange"> *</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? "مثال: رنا، أو سارة وعمر" : "e.g. Sarah, or James & Priya"}
                    className={inputCls}
                    required
                  />
                </div>

                {/* Traveler type */}
                <div>
                  <label className={labelCls}>
                    {isAr ? "نوع المسافر" : "Who did you come with"}
                    <span className="text-z-orange"> *</span>
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TRAVELER_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTravelerType(type)}
                        className={[
                          "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                          travelerType === type
                            ? "border-z-orange bg-z-orange text-white"
                            : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400",
                        ].join(" ")}
                      >
                        {TRAVELER_TYPE_LABELS[type][isAr ? "ar" : "en"]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month */}
                <div>
                  <label className={labelCls}>{isAr ? "متى زرتنا؟" : "When did you visit"}</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className={inputCls}
                  >
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className={labelCls}>
                    {isAr ? "المدينة والدولة (اختياري)" : "City & country (optional)"}
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={isAr ? "مثال: دبي، الإمارات" : "e.g. Dubai, UAE"}
                    className={inputCls}
                  />
                </div>

                {/* Review text */}
                <div>
                  <label className={labelCls}>
                    {isAr ? "تجربتك" : "Your experience"}
                    <span className="text-z-orange"> *</span>
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder={isAr
                      ? "شاركنا لحظتك المفضلة في الجولة..."
                      : "Tell us about your favourite moment on the route..."}
                    className={`${inputCls} resize-none`}
                    required
                  />
                </div>

                {/* Email (optional) */}
                <div>
                  <label className={labelCls}>
                    {isAr ? "إيميلك (اختياري، للمتابعة فقط)" : "Email (optional, for follow-up only)"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600">
                    {isAr
                      ? "حدث خطأ — يرجى المحاولة مجدداً."
                      : "Something went wrong — please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting" || !name.trim() || !text.trim() || !travelerType}
                  className="w-full rounded-2xl bg-z-orange py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-50"
                >
                  {status === "submitting"
                    ? isAr ? "جارٍ الإرسال..." : "Sending..."
                    : isAr ? "إرسال" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
