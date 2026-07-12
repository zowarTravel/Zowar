import Stripe from "stripe";
import { randomUUID } from "crypto";
import {
  findBookingBySessionId,
  appendBooking,
  getPartners,
  totalPartnerCostForBooking,
} from "@/app/lib/finance/db";
import type { Booking } from "@/app/lib/finance/types";

export const runtime = "nodejs";

// Add STRIPE_WEBHOOK_SECRET to your .env.local:
// STRIPE_WEBHOOK_SECRET=whsec_...
let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

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
  const experience = meta.experience ?? "rainbow";
  const experienceDate = meta.date || undefined;
  const locale = meta.lang ?? "en";

  // Revenue: 28 JOD per participant (fixed price at time of booking)
  const pricePerPersonJOD = 28;
  const grossRevenue = participants * pricePerPersonJOD;

  const partners = getPartners();
  const partnerCost = totalPartnerCostForBooking(participants, partners);

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
    notes: `locale:${locale}`,
    createdAt: now,
  };

  appendBooking(booking);
  console.log("[stripe-webhook] Booking created:", booking.bookingId, "session:", session.id);
}
