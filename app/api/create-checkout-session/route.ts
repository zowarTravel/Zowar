import Stripe from "stripe";
import { normalizeExperience, unitAmountUsdCents } from "@/app/lib/experiences";

export const runtime = "nodejs";
export const maxDuration = 30;

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY — check your server environment variables.");
    _stripe = new Stripe(key, {
      maxNetworkRetries: 1,
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return _stripe;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { date, timeSlot, qty, locale = "en", experience = "rainbow", halfOff = false, qottob15 = false } = body as {
      date?: string;
      timeSlot?: string;
      qty?: number;
      locale?: string;
      experience?: string;
      halfOff?: boolean;
      qottob15?: boolean;
    };

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    // Enforce 24-hour minimum booking window (Amman time, UTC+3)
    if (date) {
      const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-CA", { timeZone: "Asia/Amman" });
      if (date < minDate) {
        return Response.json(
          { error: "Bookings must be made at least 24 hours in advance." },
          { status: 400 }
        );
      }
    }

    const stripe = getStripe();

    const safeQty = Math.max(1, qty ?? 1);
    const safeExperience = normalizeExperience(experience);
    const isHighlights = safeExperience === "highlights";
    const promoCode = qottob15 ? "qottob15" : halfOff ? "halfzowar" : "";
    // Rainbow: 25 JOD ($35.25); 15% off = $29.96; half = $17.63. Highlights: 14 JOD ($19.74).
    const unitAmountCents = unitAmountUsdCents(safeExperience, qottob15 ? 0.15 : halfOff ? 0.5 : 0);
    const guests = `${safeQty} guest${safeQty > 1 ? "s" : ""}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "usd",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isHighlights ? "Zowar Rainbow Street Highlights" : "Zowar Amman Experience",
              description: isHighlights
                ? `Self-guided Rainbow Street highlights walk · 3 stops · ${guests}`
                : `Self-guided Amman food and puzzle walk · ${guests}`,
            },
            unit_amount: unitAmountCents,
          },
          quantity: safeQty,
        },
      ],
      success_url: `${origin}/success?lang=${locale}&session_id={CHECKOUT_SESSION_ID}&experience=${safeExperience}`,
      cancel_url: `${origin}/booking?lang=${locale}`,
      metadata: {
        date: date ?? "",
        timeSlot: timeSlot ?? "",
        qty: String(qty ?? 1),
        experience: safeExperience,
        lang: locale,
        promo_code: promoCode,
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
