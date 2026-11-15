import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ booked: [] });

  try {
    const stripe = getStripe();
    // Fetch recent sessions — for a small operation limit:100 covers all bookings
    const sessions = await stripe.checkout.sessions.list({ limit: 100 });

    const booked = sessions.data
      .filter(
        (s) =>
          s.metadata?.date === date && s.payment_status === "paid"
      )
      .map((s) => s.metadata?.timeSlot)
      .filter((t): t is string => !!t);

    return NextResponse.json(
      { booked },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ booked: [] });
  }
}
