"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { authApi } from "@/lib/api/services/auth";

export function RegisterForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirm_password") ?? "");
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    const email = String(form.get("email") ?? "").trim();
    setPending(true);
    try {
      await authApi.register({
        email,
        first_name: String(form.get("first_name") ?? "").trim(),
        last_name: String(form.get("last_name") ?? "").trim(),
        password,
        confirm_password: confirmPassword,
        terms_and_conditions: termsAccepted,
      });
      toast.success("Registration received", { description: "Enter the code sent to your email to confirm your account." });
      router.push(`/register/confirm?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error("Unable to register", { description: getApiErrorMessage(error) });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="register-first-name">First name</FieldLabel>
          <Input id="register-first-name" name="first_name" autoComplete="given-name" maxLength={100} required disabled={pending} />
        </Field>
        <Field>
          <FieldLabel htmlFor="register-last-name">Last name</FieldLabel>
          <Input id="register-last-name" name="last_name" autoComplete="family-name" maxLength={100} required disabled={pending} />
        </Field>
        <Field>
          <FieldLabel htmlFor="register-email">Email</FieldLabel>
          <Input id="register-email" name="email" type="email" autoComplete="email" required disabled={pending} />
        </Field>
        <Field>
          <FieldLabel htmlFor="register-password">Password</FieldLabel>
          <Input id="register-password" name="password" type="password" autoComplete="new-password"
            minLength={8} required disabled={pending} />
        </Field>
        <Field>
          <FieldLabel htmlFor="register-confirm-password">Confirm password</FieldLabel>
          <Input id="register-confirm-password" name="confirm_password" type="password" autoComplete="new-password"
            minLength={8} required disabled={pending} />
        </Field>
        <Field orientation="horizontal" data-disabled={pending}>
          <Checkbox id="register-terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked === true)} disabled={pending} />
          <FieldContent><FieldLabel htmlFor="register-terms">I accept the terms and conditions</FieldLabel></FieldContent>
        </Field>
        <Field>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending && <Spinner data-icon="inline-start" />}
            {pending ? "Creating account…" : "Register"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
