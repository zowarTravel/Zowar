// app/api/checkout/route.ts
import Stripe from "stripe";

export const runtime = "nodejs";

type Locale = "en" | "ar" | "es";

type ReqBody = {
  date: string;
  qty: number;
  locale?: Locale;
  code?: string;
};

const PRICE_PER_PERSON_JOD = 20.0;
const USD_PER_JOD = 1.41;
const USD_CENTS = 100;

function safeLocale(x: unknown): Locale {
  return x === "ar" ? "ar" : x === "es" ? "es" : "en";
}

function toUsdCentsFromJod(jodAmount: number) {
  const usd = jodAmount * USD_PER_JOD;
  return Math.round(usd * USD_CENTS);
}

function format3(n: number) {
  return n.toFixed(3);
}

function format2(n: number) {
  return n.toFixed(2);
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }
  return new Stripe(key);
}

function normalizeCode(x: unknown) {
  return String(x ?? "").trim().toLowerCase();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ReqBody>;

    const date = String(body?.date ?? "").trim();
    const qty = Number(body?.qty ?? 0);
    const locale = safeLocale(body?.locale);
    const submittedCode = normalizeCode(body?.code);
    const freeCode = normalizeCode(process.env.FREE_BOOKING_CODE);

    console.log("[checkout] incoming", {
      date,
      qty,
      locale,
      submittedCode,
      freeCode,
      freeMatch: !!freeCode && !!submittedCode && submittedCode === freeCode,
    });

    if (!date || !Number.isFinite(qty) || qty < 1) {
      return Response.json({ error: "Missing booking data." }, { status: 400 });
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const successUrl = new URL("/success", origin);
    successUrl.searchParams.set("lang", locale);

    const cancelUrl = new URL("/booking", origin);
    cancelUrl.searchParams.set("lang", locale);

    // FREE BYPASS
    if (freeCode && submittedCode && submittedCode === freeCode) {
      successUrl.searchParams.set("free", "1");

      console.log("[checkout] FREE BRANCH HIT", {
        redirect: successUrl.toString(),
      });

      return Response.json(
        {
          url: successUrl.toString(),
          free: true,
          debug: "FREE_BRANCH_HIT",
        },
        { status: 200 }
      );
    }

    const unitAmountUsdCents = toUsdCentsFromJod(PRICE_PER_PERSON_JOD);
    const unitAmountUsd = unitAmountUsdCents / 100;
    const totalJod = PRICE_PER_PERSON_JOD * qty;
    const totalUsd = unitAmountUsd * qty;

    console.log("[checkout] before stripe init");
    const stripe = getStripe();

    console.log("[checkout] before stripe session create");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted",
      currency: "usd",
      locale: locale as unknown as Stripe.Checkout.SessionCreateParams.Locale,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: locale === "ar" ? "زُوّار – رحلة تذوّق" : locale === "es" ? "ZOWAR Ruta Gastronómica" : "ZOWAR Food Scavenger Hunt",
              description:
                locale === "ar"
                  ? `رحلة تذوّق ذاتية الإرشاد — ${date} — السعر: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} د.أ للشخص`
                  : locale === "es"
                  ? `Ruta gastronómica autoguiada — ${date} — Precio: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} JOD por persona`
                  : `Self-guided culinary hunt — ${date} — Price: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} JOD per person`,
            },
            unit_amount: unitAmountUsdCents,
          },
          quantity: qty,
        },
      ],

      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),

      metadata: {
        date,
        qty: String(qty),
        lang: locale,
        promo_code_entered: submittedCode || "",
        promo_free_enabled: "false",
        display_currency: "jod",
        display_unit_amount: format3(PRICE_PER_PERSON_JOD),
        display_total_amount: format3(totalJod),
        charge_currency: "usd",
        charge_unit_amount: format2(unitAmountUsd),
        charge_total_amount: format2(totalUsd),
        usd_per_jod: String(USD_PER_JOD),
      },
    });

    console.log("[checkout] stripe session created", { url: session.url });

    return Response.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe checkout error FULL:", err);

    return Response.json(
      {
        error: err?.message || "Checkout failed.",
        type: err?.type || null,
        code: err?.code || null,
        rawType: err?.rawType || null,
      },
      { status: 500 }
    );
  }
}