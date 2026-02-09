// app/api/checkout/route.ts
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover",
});

type Locale = "en" | "ar";

type ReqBody = {
  date: string;
  qty: number;
  locale?: Locale;
};

/**
 * DISPLAY currency: JOD (what user sees)
 * CHARGE currency: USD (what Stripe actually charges until JOD is enabled)
 */

// What you want users to pay (displayed) per person in JOD
const PRICE_PER_PERSON_JOD = 20.0;

// Set a fixed rate you control: USD per 1 JOD
// Example: 1 JOD = 1.41 USD (illustrative). Replace with your chosen rate.
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ReqBody>;

    const date = String(body?.date ?? "").trim();
    const qty = Number(body?.qty ?? 0);
    const locale = safeLocale(body?.locale);

    if (!date || !Number.isFinite(qty) || qty < 1) {
      return Response.json({ error: "Missing booking data." }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted",

      // CHARGE currency (Stripe)
      currency: "usd",

      locale: locale as unknown as Stripe.Checkout.SessionCreateParams.Locale,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: locale === "ar" ? "زُوّار – رحلة تذوّق" : "ZOWAR Food Scavenger Hunt",
              // You can show the display price in the description (optional)
              description:
                locale === "ar"
                  ? `رحلة تذوّق ذاتية الإرشاد — ${date} — السعر: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} د.أ للشخص`
                  : `Self-guided culinary hunt — ${date} — Price: ${format3(
                      PRICE_PER_PERSON_JOD
                    )} JOD per person`,
            },
            // USD cents
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
    return Response.json(
      { error: err?.message || "Checkout failed." },
      { status: 500 }
    );
  }
}