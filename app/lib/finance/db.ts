import fs from "fs";
import path from "path";
import type { Booking, Partner, PartnerPayment, PartnerBalance, FinanceSummary } from "./types";

// ─── Storage paths ────────────────────────────────────────────────────────────
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

function filePath(name: string) {
  return path.join(DATA_DIR, name);
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(name: string, defaultValue: T): T {
  ensureDataDir();
  const fp = filePath(name);
  if (!fs.existsSync(fp)) return defaultValue;
  try {
    return JSON.parse(fs.readFileSync(fp, "utf8")) as T;
  } catch {
    return defaultValue;
  }
}

function writeJson<T>(name: string, data: T): void {
  ensureDataDir();
  const tmp = filePath(name) + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, filePath(name));
}

// ─── Seed partners ─────────────────────────────────────────────────────────────
// Edit costPerParticipant when prices are confirmed with each partner.
const SEED_PARTNERS: Partner[] = [
  {
    partnerId: "p_magenta",
    businessName: "Magenta Coffee",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 1.5,
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R1 – café puzzle final reveal",
  },
  {
    partnerId: "p_rumman",
    businessName: "Rumman Collective",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 4,
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R2 – pomegranate tasting",
  },
  {
    partnerId: "p_trinitae",
    businessName: "Trinitae Soap House",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 0, // placeholder – confirm with partner
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R3 – soap puzzle; price TBD",
  },
  {
    partnerId: "p_falafel",
    businessName: "Falafel Al Quds",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 0.6,
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R4 – falafel logo puzzle",
  },
  {
    partnerId: "p_yasmeenah",
    businessName: "Al Yasmeenah Sweets",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 0, // placeholder – confirm with partner
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R5 – sweets; price TBD",
  },
  {
    partnerId: "p_flour",
    businessName: "Flour & Fire",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 1.75,
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R6 – pizza stop",
  },
  {
    partnerId: "p_mijana",
    businessName: "Mijana Rooftop",
    contactName: "",
    phone: "",
    cliqAlias: "",
    paymentMethod: "cliq",
    costPerParticipant: 5,
    includedInStandardRoute: true,
    active: true,
    notes: "Stop R7 – rooftop final meal",
  },
];

// ─── Bookings ──────────────────────────────────────────────────────────────────
export function getBookings(): Booking[] {
  return readJson<Booking[]>("bookings.json", []);
}

export function saveBookings(bookings: Booking[]): void {
  writeJson("bookings.json", bookings);
}

export function findBookingBySessionId(sessionId: string): Booking | undefined {
  return getBookings().find((b) => b.stripeSessionId === sessionId);
}

export function appendBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
}

// ─── Partners ──────────────────────────────────────────────────────────────────
export function getPartners(): Partner[] {
  const stored = readJson<Partner[]>("partners.json", []);
  if (stored.length > 0) return stored;
  // First run: seed and persist
  writeJson("partners.json", SEED_PARTNERS);
  return SEED_PARTNERS;
}

export function savePartners(partners: Partner[]): void {
  writeJson("partners.json", partners);
}

// ─── Partner Payments ──────────────────────────────────────────────────────────
export function getPayments(): PartnerPayment[] {
  return readJson<PartnerPayment[]>("partner-payments.json", []);
}

export function appendPayment(payment: PartnerPayment): void {
  const payments = getPayments();
  payments.push(payment);
  writeJson("partner-payments.json", payments);
}

// ─── Calculated views ─────────────────────────────────────────────────────────
export function totalPartnerCostForBooking(participants: number, partners: Partner[]): number {
  return partners
    .filter((p) => p.active && p.includedInStandardRoute)
    .reduce((sum, p) => sum + p.costPerParticipant * participants, 0);
}

export function computePartnerBalances(
  partners: Partner[],
  bookings: Booking[],
  payments: PartnerPayment[]
): PartnerBalance[] {
  const paidBookings = bookings.filter((b) => b.status === "paid");
  const totalParticipants = paidBookings.reduce((s, b) => s + b.numberOfParticipants, 0);

  return partners
    .filter((p) => p.active && p.includedInStandardRoute)
    .map((p) => {
      const amountOwed = totalParticipants * p.costPerParticipant;
      const partnerPayments = payments.filter((pay) => pay.partnerId === p.partnerId);
      const amountPaid = partnerPayments.reduce((s, pay) => s + pay.amountPaid, 0);
      const lastPayment = partnerPayments.sort((a, b) =>
        b.paymentDate.localeCompare(a.paymentDate)
      )[0];

      return {
        partner: p,
        totalParticipants,
        amountOwed,
        amountPaid,
        balance: amountOwed - amountPaid,
        lastPaymentDate: lastPayment?.paymentDate,
      };
    });
}

export function computeSummary(
  bookings: Booking[],
  payments: PartnerPayment[],
  partnerBalances: PartnerBalance[]
): FinanceSummary {
  const paidBookings = bookings.filter((b) => b.status === "paid");

  const totalGrossRevenue = paidBookings.reduce((s, b) => s + b.grossRevenue, 0);
  const totalStripeFees = paidBookings.reduce((s, b) => s + (b.stripeFee ?? 0), 0);
  const totalNetRevenue = totalGrossRevenue - totalStripeFees;
  const totalPartnerCosts = partnerBalances.reduce((s, pb) => s + pb.amountOwed, 0);
  const totalPaidToPartners = payments.reduce((s, p) => s + p.amountPaid, 0);
  const outstandingPartnerBalance = partnerBalances.reduce(
    (s, pb) => s + Math.max(0, pb.balance),
    0
  );

  return {
    totalGrossRevenue,
    totalStripeFees,
    totalNetRevenue,
    totalPartnerCosts,
    totalPaidToPartners,
    outstandingPartnerBalance,
    estimatedNetProfit: totalNetRevenue - totalPartnerCosts,
    totalBookings: paidBookings.length,
    totalParticipants: paidBookings.reduce((s, b) => s + b.numberOfParticipants, 0),
  };
}
