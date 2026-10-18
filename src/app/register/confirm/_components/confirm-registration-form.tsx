"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { authApi } from "@/lib/api/services/auth";
import { notify } from "@/lib/notify";

export function ConfirmRegistrationForm({ initialEmail }: { initialEmail: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    try {
      await authApi.confirmRegister({ email: String(form.get("email") ?? ""), otp: String(form.get("otp") ?? "") });
      notify.success("Account confirmed", { description: "You can now sign in." });
      router.replace("/login");
    } catch (error) {
      notify.error("Unable to confirm account", { description: getApiErrorMessage(error) });
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirm your account</CardTitle>
          <CardDescription>Enter the six-character code sent to your email.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <form onSubmit={(event) => void handleSubmit(event)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="confirm-email">Email</FieldLabel>
                <Input
                  id="confirm-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={initialEmail}
                  required
                  disabled={pending}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-otp">Confirmation code</FieldLabel>
                <Input
                  id="confirm-otp"
                  name="otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  minLength={6}
                  maxLength={6}
                  required
                  disabled={pending}
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending && <Spinner data-icon="inline-start" />}
                  {pending ? "Confirming…" : "Confirm account"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <Link href="/login" className="text-center text-sm underline underline-offset-2">
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
