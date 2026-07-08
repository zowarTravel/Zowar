import type { Metadata } from "next";
import FinanceClient from "./finance_client";

export const metadata: Metadata = {
  title: "Finance – Zowar Admin",
  robots: { index: false, follow: false },
};

export default function AdminFinancePage() {
  return <FinanceClient />;
}
