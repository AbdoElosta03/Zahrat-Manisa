import type { Metadata } from "next";

import { ConfirmRegistrationForm } from "./_components/confirm-registration-form";

export const metadata: Metadata = { title: "Confirm registration" };

export default async function ConfirmRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>;
}) {
  const { email } = await searchParams;
  return <ConfirmRegistrationForm initialEmail={typeof email === "string" ? email : ""} />;
}
