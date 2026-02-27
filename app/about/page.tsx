// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Fredoka, Tajawal } from "next/font/google";

type Locale = "en" | "ar";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const copy = {
  en: {
    title: "About Zowar",
    subtitle:
      "The story behind Zowar — and why we built a different way to discover Amman.",
    kicker: "The Zowar story",
    cta: "Book your experience now",
    toggleTo: "العربية",
    home: "Home",
    body: [
      `The first time I showed my wife — who isn’t from Jordan — around Amman, I wasn’t taking her to the “top 10” tourist spots — I was taking her to the places I grew up with. The falafel shop you only know because someone in your family swears by it. The perfect rooftop to enjoy magical late Amman nights.`,
      `Watching her experience Jordan for the first time made me realize something:`,
      `If I wasn’t local, she would have never seen this side of it.`,
      `Not the real atmosphere.`,
      `Not the hidden gems.`,
      `Not the places that don’t show up on travel guides.`,
      `This is where the idea of Zowar was born. A self-guided city experience where you solve, taste, and discover your way through Amman. Something to enjoy whether it’s your first visit or your hundredth!`,
      `Each stop reveals the next. Each clue pulls you deeper. You’re not just walking between locations — you’re connecting pieces. Food, views, culture, stories — they start to experience the bigger picture.`,
      `It’s designed for visitors who want more than a checklist.`,
      `And for locals who think they’ve already seen it all.`,
      `Because sometimes you don’t need a new city.`,
      `You just need a new way to see it.`,
    ],
  },
  ar: {
    title: "عن زوّار",
    subtitle: "قصّة زوّار — وليش بنحب نخلي الناس تكتشف عمّان بطريقة مختلفة.",
    kicker: "قصّة زوّار",
    cta: "احجز تجربتك الآن",
    toggleTo: "English",
    home: "الرئيسية",
    body: [
      `أول مرة زارت زوجتي عمّان — وهي مش من الأردن — ما أخذتها على “أفضل 10 أماكن سياحية”.`,
      `أخذتها على الأماكن اللي تربّينا معها.`,
      `محل الفلافل اللي ما بتعرفه إلا عشان حدا من العيلة بحلف لك إنه أزكى لقمة بالأردن.`,
      `والإطلالة المثالية عشان تستمتع بسهرات عمّان الساحرة.`,
      `وقتها أدركت إشي مهم:`,
      `لو ما كنت من أهل البلد، ما كانت شافت هذا الجانب من الأردن.`,
      `لا الأجواء الحقيقية ولا الكنوز المخفية ولا الأماكن اللي ما بتطلع بأدلة السفر`,  
      `ومن هون وُلدت فكرة زوّار.`,
      `تجربة مدينة ذاتية الإرشاد، بتحلّ فيها ألغاز، وتتذوّق، وتكتشف طريقك عبر عمّان — تجربة بتستمتع فيها سواء كانت زيارتك الأولى أو المية.`,
      `كل محطة بتكشف اللي بعدها.`,
      `كل لغز بأخذك أعمق.`,
      `إنت ما بتتنقل بس بين أماكن — إنت بتربط بين التفاصيل.`,
      `زوّار مصمّمة للي بدهم طريقة جديدة يعيشوا المدينة.`, 
      `لأنك أحيانًا ما بتحتاج مدينة جديدة.`,
      `بتحتاج طريقة جديدة تشوفها فيها.`,
    ],
  },
} as const;

function safeLocale(x: unknown): Locale {
  return x === "ar" ? "ar" : "en";
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = safeLocale(lang);
  const isAr = locale === "ar";
  const t = copy[locale];

  // preserve lang across nav
  const langParam = `lang=${locale}`;
  const toggleHref = `/about?lang=${isAr ? "en" : "ar"}`;
  const homeHref = `/?${langParam}`;
  const bookingHref = `/booking?${langParam}`;

  const fontClass = isAr ? tajawal.className : fredoka.className;

  // Booking-style background + glass
  const pageBg =
    "min-h-screen text-neutral-900 bg-[radial-gradient(900px_600px_at_18%_24%,rgba(255,137,54,0.18),transparent_55%),radial-gradient(700px_500px_at_80%_30%,rgba(0,0,0,0.06),transparent_55%),linear-gradient(to_bottom,#ffffff,#f6f6f7)]";

  const glassCard =
    "rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]";

  const subtleBtn =
    "rounded-xl border border-black/10 bg-white px-3 py-2 text-sm hover:bg-black/[0.03]";

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`${pageBg} ${fontClass}`}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Top bar (Booking style) */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Click logo to go home */}
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

          {/* No top CTA — only toggle + home */}
          <div className="flex gap-2">
            <Link href={toggleHref} className={subtleBtn}>
              {t.toggleTo}
            </Link>
            <Link href={homeHref} className={subtleBtn}>
              {t.home}
            </Link>
          </div>
        </div>

        {/* Content card */}
        <section className={`mt-10 ${glassCard} relative overflow-hidden p-6 sm:p-8`}>
          {/* soft orange glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(700px 450px at 18% 30%, rgba(255,137,54,0.18), transparent 60%)",
              backgroundSize: "auto",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#ff8936]" />
              {t.kicker}
            </div>

            <div className="space-y-3 text-[15px] leading-7 text-neutral-700">
              {t.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Only CTA after story */}
            <div className="mt-8">
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center rounded-2xl bg-[#ff8936] px-5 py-4 font-semibold text-neutral-950 hover:opacity-95"
              >
                {t.cta}
              </Link>

              <p className="mt-3 text-xs text-neutral-500">
                {isAr
                  ? "بعد الحجز بتوصلك رسالة تأكيد + رابط الدخول للبوابة."
                  : "After checkout, you’ll receive a confirmation + the Portal access link."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}