import Stripe from "stripe";

export const runtime = "nodejs";
export const maxDuration = 30;

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY — check your server environment variables.");
    _stripe = new Stripe(key, { maxNetworkRetries: 0 });
  }
  return _stripe;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { date, timeSlot, qty, locale = "en", experience = "rainbow", halfOff = false } = body as {
      date?: string;
      timeSlot?: string;
      qty?: number;
      locale?: string;
      experience?: string;
      halfOff?: boolean;
    };

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "usd",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Zowar Amman Experience",
              description: "Self-guided Amman food and puzzle walk",
            },
            unit_amount: halfOff ? 1974 : 3948, // $39.48 = 28 JOD, half = $19.74
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?lang=${locale}&session_id={CHECKOUT_SESSION_ID}&experience=${experience}`,
      cancel_url: `${origin}/booking?lang=${locale}`,
      metadata: {
        date: date ?? "",
        timeSlot: timeSlot ?? "",
        qty: String(qty ?? 1),
        experience: experience ?? "rainbow",
        lang: locale,
      },
    });

    return Response.json({ url: session.url });
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[create-checkout-session]", err);
    return Response.json(
      { error: e?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
