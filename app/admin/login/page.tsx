import React, { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./login_form";

export const metadata: Metadata = {
  title: "Admin Login – Zowar",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-neutral-100" />}>
      <LoginForm />
    </Suspense>
  );
}
