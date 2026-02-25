// app/api/checkout/route.ts
import Stripe from "stripe";

export const runtime = "nodejs";

type Locale = "en" | "ar";

type ReqBody = {
  date: string;
  qty: number;
  locale?: Locale;

  // ✅ Optional promo code (used for FREE bypass)
  code?: string;
};

/**
 * DISPLAY currency: JOD (what user sees)
 * CHARGE currency: USD (what Stripe charges until JOD is enabled)
 */

// What you want users to pay (displayed) per person in JOD
const PRICE_PER_PERSON_JOD = 20.0;

// Set a fixed rate you control: USD per 1 JOD
// Example: 1 JOD = 1.41 USD. Replace with your chosen rate.
const USD_PER_JOD = 1.41;

// Stripe needs integer cents for USD
const USD_CENTS = 100;

function safeLocale(x: unknown): Locale {
  return x === "ar" ? "ar" : "en";
}

function toUsdCentsFromJod(jodAmount: number) {
  // Convert JOD -> USD -> cents
  const usd = jodAmount * USD_PER_JOD;
  return Math.round(usd * USD_CENTS);
}

// Optional: nice formatting for metadata
function format3(n: number) {
  // 20 -> "20.000" style
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
  // ✅ No apiVersion override
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

    // ✅ promo code from client
    const submittedCode = normalizeCode(body?.code);

    // ✅ normalize env code BEFORE using/logging it
    const FREE_CODE = normalizeCode(process.env.FREE_BOOKING_CODE);

    // Debug logs (safe)
    console.log("[checkout] submittedCode =", submittedCode);
    console.log("[checkout] FREE_BOOKING_CODE =", process.env.FREE_BOOKING_CODE);
    console.log("[checkout] FREE_CODE(normalized) =", FREE_CODE);

    if (!date || !Number.isFinite(qty) || qty < 1) {
      return Response.json({ error: "Missing booking data." }, { status: 400 });
    }

    // ✅ FREE BYPASS (no Stripe)
    // Put this in .env.local:
    // FREE_BOOKING_CODE=ZOWARFREE
    if (FREE_CODE && submittedCode && submittedCode === FREE_CODE) {
      return Response.json({ free: true }, { status: 200 });
    }

    // Origin fallback (works outside Vercel too)
    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const successUrl = new URL("/success", origin);
    successUrl.searchParams.set("lang", locale);

    const cancelUrl = new URL("/booking", origin);
    cancelUrl.searchParams.set("lang", locale);

    // Charge per person in USD cents (derived from JOD display amount)
    const unitAmountUsdCents = toUsdCentsFromJod(PRICE_PER_PERSON_JOD);

    // For metadata clarity
    const unitAmountUsd = unitAmountUsdCents / 100;
    const totalJod = PRICE_PER_PERSON_JOD * qty;
    const totalUsd = unitAmountUsd * qty;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted",

      // CHARGE currency (Stripe)
      currency: "usd",

      // Stripe’s allowed locales are limited; casting is okay since we only send "en" or "ar"
      locale: locale as unknown as Stripe.Checkout.SessionCreateParams.Locale,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: locale === "ar" ? "زُوّار – رحلة تذوّق" : "ZOWAR Food Scavenger Hunt",
              description:
                locale === "ar"
                  ? `رحلة تذوّق ذاتية الإرشاد — ${date} — السعر: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} د.أ للشخص`
                  : `Self-guided culinary hunt — ${date} — Price: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} JOD per person`,
            },
            unit_amount: unitAmountUsdCents, // USD cents
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

        // Debugging / traceability
        promo_code_entered: submittedCode || "",
        promo_free_enabled: "false",

        // What user sees
        display_currency: "jod",
        display_unit_amount: format3(PRICE_PER_PERSON_JOD),
        display_total_amount: format3(totalJod),

        // What Stripe charges
        charge_currency: "usd",
        charge_unit_amount: format2(unitAmountUsd),
        charge_total_amount: format2(totalUsd),

        // Your chosen conversion rate
        usd_per_jod: String(USD_PER_JOD),
      },
    });

    return Response.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe checkout error:", err?.message ?? err);
    return Response.json({ error: err?.message || "Checkout failed." }, { status: 500 });
  }
}
