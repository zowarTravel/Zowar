import {
  getBookings,
  getPartners,
  getPayments,
  computePartnerBalances,
  computeSummary,
} from "@/app/lib/finance/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const bookings = getBookings();
    const partners = getPartners();
    const payments = getPayments();

    const partnerBalances = computePartnerBalances(partners, bookings, payments);
    const summary = computeSummary(bookings, payments, partnerBalances);

    return Response.json({
      summary,
      bookings: bookings.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      partners,
      payments: payments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      partnerBalances,
    });
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[admin/finance]", err);
    return Response.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
