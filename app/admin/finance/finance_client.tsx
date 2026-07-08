"use client";

import React, { useCallback, useEffect, useState } from "react";
import type {
  Booking,
  FinanceSummary,
  Partner,
  PartnerBalance,
  PartnerPayment,
  PaymentMethod,
} from "@/app/lib/finance/types";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface FinanceData {
  summary: FinanceSummary;
  bookings: Booking[];
  partners: Partner[];
  payments: PartnerPayment[];
  partnerBalances: PartnerBalance[];
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function jod(n: number) {
  return `${n.toFixed(2)} JOD`;
}

function fmtDate(iso?: string) {
  if (!iso) return "–";
  return iso.slice(0, 10);
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-[#C8694A]/20 bg-[#C8694A]/5"
          : "border-neutral-200 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{label}</p>
      <p
        className={`mt-2 text-2xl font-bold ${accent ? "text-[#C8694A]" : "text-neutral-900"}`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-neutral-400">{sub}</p>}
    </div>
  );
}

// ─── Record Payment Modal ──────────────────────────────────────────────────────
function RecordPaymentModal({
  partner,
  defaultAmount,
  onClose,
  onSuccess,
}: {
  partner: Partner;
  defaultAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [amount, setAmount] = useState(defaultAmount.toFixed(2));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [method, setMethod] = useState<PaymentMethod>("cliq");
  const [cliqRef, setCliqRef] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/finance/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: partner.partnerId,
          amountPaid: parseFloat(amount),
          paymentDate: date,
          method,
          cliqReference: cliqRef || undefined,
          notes: notes || undefined,
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const d = await res.json();
        setError(d.error || "Failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-neutral-900">
            Record payment — {partner.businessName}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-neutral-500">Amount (JOD)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#C8694A] focus:ring-2 focus:ring-[#C8694A]/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-neutral-500">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#C8694A] focus:ring-2 focus:ring-[#C8694A]/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-neutral-500">Method</span>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethod)}
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#C8694A]"
            >
              <option value="cliq">CliQ</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="other">Other</option>
            </select>
          </label>

          {method === "cliq" && (
            <label className="block">
              <span className="text-xs font-medium text-neutral-500">CliQ Reference (optional)</span>
              <input
                type="text"
                value={cliqRef}
                onChange={(e) => setCliqRef(e.target.value)}
                placeholder="Transaction ID"
                className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#C8694A] focus:ring-2 focus:ring-[#C8694A]/20"
              />
            </label>
          )}

          <label className="block">
            <span className="text-xs font-medium text-neutral-500">Notes (optional)</span>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. covers weeks 1–3"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-[#C8694A] focus:ring-2 focus:ring-[#C8694A]/20"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-[#C8694A] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Saving…" : "Record Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function FinanceClient() {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payingPartner, setPayingPartner] = useState<{
    partner: Partner;
    defaultAmount: number;
  } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/finance");
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch {
      setError("Failed to load finance data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <p className="text-sm text-neutral-400">Loading…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <p className="text-sm text-red-500">{error || "No data"}</p>
      </div>
    );
  }

  const { summary, bookings, partners, payments, partnerBalances } = data;
  const outstandingBalances = partnerBalances.filter((pb) => pb.balance > 0.005);

  return (
    <main className="min-h-screen bg-neutral-100 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C8694A]">
            Zowar Admin
          </p>
          <h1 className="text-lg font-bold text-neutral-900">Finance</h1>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-50"
        >
          Sign out
        </button>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        {/* ── Summary ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Overview
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <SummaryCard
              label="Gross Revenue"
              value={jod(summary.totalGrossRevenue)}
              sub={`${summary.totalBookings} bookings`}
            />
            <SummaryCard
              label="Stripe Fees"
              value={jod(summary.totalStripeFees)}
              sub="Manually logged"
            />
            <SummaryCard
              label="Net Revenue"
              value={jod(summary.totalNetRevenue)}
            />
            <SummaryCard
              label="Partner Costs"
              value={jod(summary.totalPartnerCosts)}
              sub={`${summary.totalParticipants} participants`}
            />
            <SummaryCard
              label="Outstanding"
              value={jod(summary.outstandingPartnerBalance)}
              accent={summary.outstandingPartnerBalance > 0}
            />
            <SummaryCard
              label="Net Profit"
              value={jod(summary.estimatedNetProfit)}
              accent
              sub="Before Stripe fees adj."
            />
          </div>
        </section>

        {/* ── Weekly Payout ─────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Outstanding Partner Payouts
          </h2>

          {outstandingBalances.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center text-sm text-neutral-400">
              All partners are up to date. No outstanding balances.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-left">
                    <th className="px-4 py-3 font-semibold text-neutral-500">Partner</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">CliQ Alias</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Phone</th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-500">Owed</th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-500">Balance</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Last Paid</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Notes</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {outstandingBalances.map((pb, i) => (
                    <tr
                      key={pb.partner.partnerId}
                      className={`border-b border-neutral-50 last:border-0 ${i % 2 === 0 ? "" : "bg-neutral-50/40"}`}
                    >
                      <td className="px-4 py-3 font-medium text-neutral-900">
                        {pb.partner.businessName}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {pb.partner.cliqAlias || <span className="text-neutral-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {pb.partner.phone || <span className="text-neutral-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-neutral-700">
                        {jod(pb.amountOwed)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#C8694A]">
                        {jod(pb.balance)}
                      </td>
                      <td className="px-4 py-3 text-neutral-500">
                        {fmtDate(pb.lastPaymentDate)}
                      </td>
                      <td className="px-4 py-3 text-xs text-neutral-400">
                        {pb.partner.notes || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            setPayingPartner({
                              partner: pb.partner,
                              defaultAmount: pb.balance,
                            })
                          }
                          className="rounded-lg bg-[#C8694A]/10 px-3 py-1.5 text-xs font-semibold text-[#C8694A] hover:bg-[#C8694A]/20"
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Bookings ──────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Bookings
          </h2>
          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center text-sm text-neutral-400">
              No bookings yet. They will appear here after Stripe webhooks are configured.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full min-w-[740px] text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-left">
                    <th className="px-4 py-3 font-semibold text-neutral-500">Date</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Customer</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Experience</th>
                    <th className="px-4 py-3 text-center font-semibold text-neutral-500">Pax</th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-500">Revenue</th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-500">Partner Cost</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Status</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Exp. Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr
                      key={b.bookingId}
                      className={`border-b border-neutral-50 last:border-0 ${i % 2 === 0 ? "" : "bg-neutral-50/40"}`}
                    >
                      <td className="px-4 py-3 text-neutral-500">{fmtDate(b.bookingDate)}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-neutral-900">{b.customerName}</p>
                        <p className="text-xs text-neutral-400">{b.customerEmail}</p>
                      </td>
                      <td className="px-4 py-3 capitalize text-neutral-600">{b.experience}</td>
                      <td className="px-4 py-3 text-center text-neutral-700">
                        {b.numberOfParticipants}
                      </td>
                      <td className="px-4 py-3 text-right text-neutral-700">
                        {jod(b.grossRevenue)}
                      </td>
                      <td className="px-4 py-3 text-right text-neutral-500">
                        {jod(b.totalPartnerCost)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            b.status === "paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : b.status === "refunded"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-500">
                        {fmtDate(b.experienceDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Partners ──────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Partners
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-left">
                  <th className="px-4 py-3 font-semibold text-neutral-500">Partner</th>
                  <th className="px-4 py-3 text-right font-semibold text-neutral-500">
                    Cost / Pax
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-neutral-500">
                    Total Owed
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-neutral-500">
                    Total Paid
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-neutral-500">Balance</th>
                  <th className="px-4 py-3 font-semibold text-neutral-500">Notes</th>
                </tr>
              </thead>
              <tbody>
                {partnerBalances.map((pb, i) => (
                  <tr
                    key={pb.partner.partnerId}
                    className={`border-b border-neutral-50 last:border-0 ${i % 2 === 0 ? "" : "bg-neutral-50/40"}`}
                  >
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {pb.partner.businessName}
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-600">
                      {jod(pb.partner.costPerParticipant)}
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-600">
                      {jod(pb.amountOwed)}
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-600">
                      {jod(pb.amountPaid)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        pb.balance > 0.005
                          ? "text-[#C8694A]"
                          : "text-emerald-600"
                      }`}
                    >
                      {jod(pb.balance)}
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-400">
                      {pb.partner.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Payment History ───────────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
            Payment History
          </h2>
          {payments.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center text-sm text-neutral-400">
              No payments recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-left">
                    <th className="px-4 py-3 font-semibold text-neutral-500">Date</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Partner</th>
                    <th className="px-4 py-3 text-right font-semibold text-neutral-500">Amount</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Method</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Reference</th>
                    <th className="px-4 py-3 font-semibold text-neutral-500">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pay, i) => {
                    const p = partners.find((x) => x.partnerId === pay.partnerId);
                    return (
                      <tr
                        key={pay.paymentId}
                        className={`border-b border-neutral-50 last:border-0 ${i % 2 === 0 ? "" : "bg-neutral-50/40"}`}
                      >
                        <td className="px-4 py-3 text-neutral-500">{pay.paymentDate}</td>
                        <td className="px-4 py-3 font-medium text-neutral-900">
                          {p?.businessName ?? pay.partnerId}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                          {jod(pay.amountPaid)}
                        </td>
                        <td className="px-4 py-3 capitalize text-neutral-600">{pay.method}</td>
                        <td className="px-4 py-3 text-neutral-500">
                          {pay.cliqReference || "—"}
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-400">
                          {pay.notes || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Record Payment modal */}
      {payingPartner && (
        <RecordPaymentModal
          partner={payingPartner.partner}
          defaultAmount={payingPartner.defaultAmount}
          onClose={() => setPayingPartner(null)}
          onSuccess={() => {
            setPayingPartner(null);
            load();
          }}
        />
      )}
    </main>
  );
}
