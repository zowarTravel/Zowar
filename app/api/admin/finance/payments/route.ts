import { randomUUID } from "crypto";
import { appendPayment, getPartners } from "@/app/lib/finance/db";
import type { PartnerPayment, PaymentMethod } from "@/app/lib/finance/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      partnerId?: string;
      amountPaid?: number;
      paymentDate?: string;
      method?: PaymentMethod;
      cliqReference?: string;
      notes?: string;
    };

    const { partnerId, amountPaid, paymentDate, method } = body;

    if (!partnerId || !amountPaid || !paymentDate || !method) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const partners = getPartners();
    if (!partners.find((p) => p.partnerId === partnerId)) {
      return Response.json({ error: "Unknown partner" }, { status: 404 });
    }

    const payment: PartnerPayment = {
      paymentId: randomUUID(),
      partnerId,
      amountPaid: Number(amountPaid),
      paymentDate,
      method,
      cliqReference: body.cliqReference || undefined,
      notes: body.notes || undefined,
      createdAt: new Date().toISOString(),
    };

    appendPayment(payment);
    return Response.json({ ok: true, paymentId: payment.paymentId });
  } catch (err: unknown) {
    const e = err as { message?: string };
    return Response.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
