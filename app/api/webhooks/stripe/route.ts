import type Stripe from "stripe";
import { randomUUID } from "crypto";
import { getStripe } from "@/app/lib/stripe";
import { sendBookingEmails } from "@/app/lib/booking-emails";
import {
  findBookingBySessionId,
  appendBooking,
  getPartners,
  totalPartnerCostForBooking,
} from "@/app/lib/finance/db";
import type { Booking } from "@/app/lib/finance/types";
import { normalizeExperience, PRICE_PER_PERSON_JOD } from "@/app/lib/experiences";

export const runtime = "nodejs";
export const maxDuration = 30;

// Add STRIPE_WEBHOOK_SECRET to your .env.local:
// STRIPE_WEBHOOK_SECRET=whsec_...

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] Missing STRIPE_WEBHOOK_SECRET");
    return new Response("Server misconfiguration", { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[stripe-webhook] Signature verification failed:", e?.message);
    return new Response(`Webhook error: ${e?.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);

    // Runs even for an already-recorded booking, so a Stripe retry can finish a failed send
    try {
      await sendBookingEmails(session);
    } catch (err) {
      console.error("[stripe-webhook] Booking emails failed:", session.id, err);
      return new Response("Booking emails failed", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Idempotency: skip if already recorded
  if (findBookingBySessionId(session.id)) {
    console.log("[stripe-webhook] Duplicate session, skipping:", session.id);
    return;
  }

  const meta = session.metadata ?? {};
  const participants = Math.max(1, parseInt(meta.qty ?? "1", 10));
  const experience = normalizeExperience(meta.experience);
  const experienceDate = meta.date || undefined;
  const locale = meta.lang ?? "en";
  const promoCode = meta.promo_code || undefined;

  // Revenue: fixed price per participant at time of booking (Full stays at 28 JOD as before)
  const pricePerPersonJOD = experience === "highlights" ? PRICE_PER_PERSON_JOD.highlights : 28;
  const grossRevenue = participants * pricePerPersonJOD;

  const partners = getPartners();
  const partnerCost = totalPartnerCostForBooking(participants, partners, experience);

  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  const booking: Booking = {
    bookingId: randomUUID(),
    stripeSessionId: session.id,
    customerName: session.customer_details?.name ?? "Unknown",
    customerEmail: session.customer_details?.email ?? "",
    bookingDate: today,
    experienceDate,
    numberOfParticipants: participants,
    grossRevenue,
    stripeFee: undefined,  // fill in manually if needed
    netRevenue: grossRevenue,
    currency: "JOD",
    experience,
    status: "paid",
    totalPartnerCost: partnerCost,
    promoCode,
    notes: `locale:${locale}`,
    createdAt: now,
  };

  appendBooking(booking);
  console.log("[stripe-webhook] Booking created:", booking.bookingId, "session:", session.id);
}
