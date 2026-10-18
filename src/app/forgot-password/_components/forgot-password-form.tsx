"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { authApi } from "@/lib/api/services/auth";
import { notify } from "@/lib/notify";

export function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setPending(true);
    try {
      const response = await authApi.forgotPassword({ email });
      setMessage(response.message);
    } catch (error) {
      notify.error("Unable to request password reset", { description: getApiErrorMessage(error) });
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>Enter your email to request a password reset.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {message ? (
            <p role="status" className="text-sm">
              {message}
            </p>
          ) : (
            <form onSubmit={(event) => void handleSubmit(event)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
                  <Input id="forgot-email" name="email" type="email" autoComplete="email" required disabled={pending} />
                </Field>
                <Field>
                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending && <Spinner data-icon="inline-start" />}
                    {pending ? "Sending…" : "Request reset"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}
          <Link href="/login" className="text-center text-sm underline underline-offset-2">
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
