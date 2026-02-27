"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Locale = "en" | "ar";
type Status = "idle" | "sending" | "success" | "error";

const copy = {
  en: {
    title: "Collaborate",
    subtitle:
      "Partner with Zowar. We bring guests to local spots through a guided food puzzle walk.",
    howTitle: "How it works",
    howSteps: [
      "We send guests your way (clear route + friendly flow)",
      "You offer a simple tasting (fast to serve)",
      "We handle the experience (puzzles + support)",
    ],
    goodPartnerTitle: "What makes a good partner?",
    goodPartner: [
      "Consistent quality and friendly service",
      "Fast fulfillment (ideally under 5 minutes)",
      "A signature item you’re proud of",
      "Open to a simple partner deal (fixed price per guest or voucher redemption)",
    ],
    whyTitle: "Why partner with us?",
    why: [
      "New customers during off-peak hours",
      "Social content + organic word-of-mouth",
      "Clear, predictable demand (we schedule routes)",
      "Feature on Zowar routes + future expansions",
    ],
    formTitle: "Partner inquiry",
    formNote: "Fill this out and we’ll reach out.",
    fields: {
      business: "Business name",
      contact: "Contact name",
      email: "Email",
      phone: "Phone / WhatsApp",
      area: "Area (e.g., Rainbow St.)",
      type: "Type (café, dessert, falafel, retail, etc.)",
      message: "Message",
    },
    required: "Required",
    send: "Send",
    sending: "Sending…",
    successTitle: "Sent!",
    successBody: "Thanks — we’ll reach out soon.",
    errorTitle: "Couldn’t send",
    errorBody: "Please check required fields and try again.",
    dmLine: "Prefer DM?",
    dm: "Message us on Instagram",
    toggle: "AR",
    home: "Home",
  },
  ar: {
    title: "الشراكات",
    subtitle:
      "تعاون مع زوّار. نجيب زوّار لمحلات محلية من خلال تجربة ألغاز ومشي مع تذوّقات.",
    howTitle: "كيف تعمل التجربة؟",
    howSteps: [
      "نوجّه الزوّار لمكانك (مسار واضح وتجربة مرتّبة)",
      "تقدّم تذوّق بسيط (سريع التجهيز)",
      "نحن ندير التجربة (ألغاز + دعم)",
    ],
    goodPartnerTitle: "مين مناسب يكون شريك؟",
    goodPartner: [
      "جودة ثابتة وخدمة لطيفة",
      "تجهيز سريع (يفضل أقل من 5 دقائق)",
      "صنف مميز معروف عندكم",
      "مرونة باتفاق بسيط (سعر ثابت لكل زائر أو قسائم)",
    ],
    whyTitle: "ليش تتعاون معنا؟",
    why: [
      "زبائن جدد بأوقات الهدوء",
      "محتوى سوشال وانتشار طبيعي",
      "طلب متوقّع وواضح (حجوزات ومسارات)",
      "ظهور في مسارات زوّار وتوسّع لاحقًا",
    ],
    formTitle: "طلب شراكة",
    formNote: "عبّي البيانات وسنتواصل معك.",
    fields: {
      business: "اسم المحل",
      contact: "اسم الشخص المسؤول",
      email: "الإيميل",
      phone: "هاتف / واتساب",
      area: "المنطقة (مثال: شارع الرينبو)",
      type: "النوع (كافيه، حلويات، فلافل، متجر…)",
      message: "رسالة",
    },
    required: "مطلوب",
    send: "إرسال",
    sending: "جاري الإرسال…",
    successTitle: "تم الإرسال!",
    successBody: "شكرًا — سنتواصل معك قريبًا.",
    errorTitle: "تعذّر الإرسال",
    errorBody: "تأكد من الحقول المطلوبة ثم جرّب مرة ثانية.",
    dmLine: "بدك رسائل مباشرة؟",
    dm: "راسلنا على إنستغرام",
    toggle: "EN",
    home: "الرئيسية",
  },
} as const;

function OrangeBullet() {
  return (
    <span
      className="mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full"
      style={{ backgroundColor: "#f97316" }}
    />
  );
}

function BulletedList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 grid gap-2 text-sm text-neutral-700">
      {items.map((s, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <OrangeBullet />
          <span className="leading-6">{s}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CollaborateClient({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const t = copy[locale];

  const toggleHref = `/collaborate?lang=${isAr ? "en" : "ar"}`;
  const homeHref = `/?lang=${locale}`;

  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot
    const trap = String(fd.get("website") || "");
    if (trap.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      locale,
      business: String(fd.get("business") || "").trim(),
      contact: String(fd.get("contact") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      area: String(fd.get("area") || "").trim(),
      type: String(fd.get("type") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.business || !payload.contact || !payload.email) {
      setStatus("error");
      setErrorMsg(isAr ? "الرجاء تعبئة الحقول المطلوبة." : "Please fill the required fields.");
      return;
    }

    try {
      setStatus("sending");

      const res = await fetch("/api/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let serverErr = "";
      try {
        const data = (await res.json()) as { error?: string };
        serverErr = data?.error || "";
      } catch {
        // ignore
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          serverErr ||
            (isAr ? "حصل خطأ. جرّب مرة ثانية." : "Something went wrong. Please try again.")
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(isAr ? "حصل خطأ بالشبكة. جرّب مرة ثانية." : "Network error. Please try again.");
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
        {/* Header */}
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

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left */}
          <section className={`${glassCard} relative overflow-hidden p-6`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(600px 400px at 15% 35%, rgba(255,165,0,0.20), transparent 55%)",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
              <Image
                src="/images/booking/bg-left.webp"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                <div className="text-sm font-semibold">{t.howTitle}</div>
                <BulletedList items={t.howSteps} />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                  <div className="text-sm font-semibold">{t.goodPartnerTitle}</div>
                  <BulletedList items={t.goodPartner} />
                </div>

                <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                  <div className="text-sm font-semibold">{t.whyTitle}</div>
                  <BulletedList items={t.why} />
                </div>
              </div>
            </div>
          </section>

          {/* Right */}
          <aside className={`${glassCard} p-6`}>
            <div className="text-base font-semibold">{t.formTitle}</div>
            <p className="mt-2 text-sm text-neutral-600">{t.formNote}</p>

            {status !== "idle" && (
              <div
                className={[
                  "mt-4 rounded-2xl border p-4 text-sm",
                  status === "success"
                    ? "border-green-600/20 bg-green-600/10 text-green-800"
                    : status === "error"
                    ? "border-red-600/20 bg-red-600/10 text-red-800"
                    : "border-black/10 bg-black/[0.03] text-neutral-700",
                ].join(" ")}
              >
                {status === "success" ? (
                  <>
                    <div className="font-semibold">{t.successTitle}</div>
                    <div className="mt-1">{t.successBody}</div>
                  </>
                ) : status === "error" ? (
                  <>
                    <div className="font-semibold">{t.errorTitle}</div>
                    <div className="mt-1">{errorMsg || t.errorBody}</div>
                  </>
                ) : (
                  <div>{t.sending}</div>
                )}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-5 grid gap-3">
              {/* Honeypot */}
              <div className="hidden">
                <label>
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <Field label={`${t.fields.business} • ${t.required}`} name="business" required />
              <Field label={`${t.fields.contact} • ${t.required}`} name="contact" required />

              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label={`${t.fields.email} • ${t.required}`}
                  name="email"
                  type="email"
                  required
                />
                <Field label={t.fields.phone} name="phone" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t.fields.area} name="area" />
                <Field label={t.fields.type} name="type" />
              </div>

              <Field label={t.fields.message} name="message" textarea />

              <button
                type="submit"
                disabled={status === "sending"}
                className={[
                  "mt-2 w-full rounded-2xl px-5 py-4 font-semibold text-neutral-950 transition",
                  status === "sending" ? "cursor-not-allowed opacity-70" : "hover:opacity-95",
                ].join(" ")}
                style={{
                  backgroundColor: status === "sending" ? "rgba(249,115,22,0.25)" : "#f97316",
                  boxShadow:
                    status === "sending"
                      ? "none"
                      : "0 0 0 1px rgba(249,115,22,0.15), 0 0 30px rgba(249,115,22,0.35)",
                }}
              >
                {status === "sending" ? t.sending : t.send}
              </button>

              <div className="mt-3 text-center text-xs text-neutral-500">
                {t.dmLine}{" "}
                <a
                  className="underline decoration-black/20 hover:decoration-black/40"
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.dm}
                </a>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none " +
    "focus:border-black/20 focus:ring-2 focus:ring-black/10";

  return (
    <label className="grid gap-2">
      <span className="text-sm text-neutral-600">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} required={required} className={base} />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}