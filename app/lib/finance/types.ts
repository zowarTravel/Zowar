export type BookingStatus = "paid" | "refunded" | "cancelled" | "pending";
export type PaymentMethod = "cliq" | "bank_transfer" | "cash" | "other";

export interface Booking {
  bookingId: string;
  stripeSessionId: string;
  customerName: string;
  customerEmail: string;
  bookingDate: string;       // ISO date of when they booked
  experienceDate?: string;   // date they plan to do the experience
  numberOfParticipants: number;
  grossRevenue: number;      // JOD
  stripeFee?: number;        // JOD – optional, fill in manually
  netRevenue: number;        // grossRevenue - (stripeFee ?? 0)
  currency: "JOD";
  experience: string;        // "rainbow" | "weibdeh"
  status: BookingStatus;
  totalPartnerCost: number;  // sum of all active standard-route partners × participants
  notes?: string;
  createdAt: string;         // ISO datetime
}

export interface Partner {
  partnerId: string;
  businessName: string;
  contactName?: string;
  phone?: string;
  cliqAlias?: string;
  paymentMethod?: PaymentMethod;
  iban?: string;
  // ↓ EDIT THESE per partner when prices are confirmed
  costPerParticipant: number; // JOD
  includedInStandardRoute: boolean;
  active: boolean;
  notes?: string;
}

export interface PartnerPayment {
  paymentId: string;
  partnerId: string;
  amountPaid: number;        // JOD
  paymentDate: string;       // ISO date
  method: PaymentMethod;
  cliqReference?: string;
  coversBookingIds?: string[];
  notes?: string;
  createdAt: string;
}

export interface PartnerBalance {
  partner: Partner;
  totalParticipants: number;
  amountOwed: number;        // totalParticipants × costPerParticipant
  amountPaid: number;        // sum of payments
  balance: number;           // amountOwed - amountPaid
  lastPaymentDate?: string;
}

export interface FinanceSummary {
  totalGrossRevenue: number;
  totalStripeFees: number;
  totalNetRevenue: number;
  totalPartnerCosts: number;
  totalPaidToPartners: number;
  outstandingPartnerBalance: number;
  estimatedNetProfit: number;
  totalBookings: number;
  totalParticipants: number;
}
