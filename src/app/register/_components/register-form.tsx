"use client";

import { type FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { APP_CONFIG } from "@/config/app-config";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { authApi } from "@/lib/api/services/auth";
import { notify } from "@/lib/notify";

function splitFullName(fullName: string): { first_name: string; last_name: string } {
  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) {
    return { first_name: trimmed, last_name: "-" };
  }
  return {
    first_name: trimmed.slice(0, spaceIndex),
    last_name: trimmed.slice(spaceIndex + 1).trim() || "-",
  };
}

export function RegisterForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      notify.error("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      notify.error("Please accept the terms and conditions");
      return;
    }
    const { first_name, last_name } = splitFullName(name);
    if (!first_name) {
      notify.error("Please enter your name");
      return;
    }

    setPending(true);
    try {
      await authApi.register({
        email: email.trim(),
        first_name,
        last_name,
        password,
        confirm_password: confirmPassword,
        terms_and_conditions: termsAccepted,
      });
      notify.success("Registration received", {
        description: "Enter the code sent to your email to confirm your account.",
      });
      router.push(`/register/confirm?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      notify.error("Unable to register", { description: getApiErrorMessage(error) });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)}>
      <FieldGroup className="gap-4">
        <Field className="gap-2">
          <FieldLabel className="leading-5" htmlFor="register-name">
            Full name*
          </FieldLabel>
          <Input
            type="text"
            id="register-name"
            placeholder="Enter your full name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={pending}
          />
        </Field>
        <Field className="gap-2">
          <FieldLabel className="leading-5" htmlFor="register-email">
            Email address*
          </FieldLabel>
          <Input
            type="email"
            id="register-email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={pending}
          />
        </Field>
        <Field className="w-full gap-2">
          <FieldLabel className="leading-5" htmlFor="register-password">
            Password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="register-password"
              type={isVisible ? "text" : "password"}
              placeholder="••••••••••••••••"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={pending}
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible((prevState) => !prevState)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
                disabled={pending}
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field className="w-full gap-2">
          <FieldLabel className="leading-5" htmlFor="register-confirm-password">
            Confirm password*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="register-confirm-password"
              type={isConfirmVisible ? "text" : "password"}
              placeholder="••••••••••••••••"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={pending}
            />
            <InputGroupAddon align="inline-end" className="pr-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsConfirmVisible((prevState) => !prevState)}
                className="text-muted-foreground rounded-l-none hover:bg-transparent"
                disabled={pending}
              >
                {isConfirmVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className="sr-only">{isConfirmVisible ? "Hide password" : "Show password"}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field orientation="horizontal" className="flex items-center gap-2">
          <Checkbox
            id="agreeToTerms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            disabled={pending}
          />
          <FieldLabel htmlFor="agreeToTerms" className="font-normal">
            <span className="text-muted-foreground">I accept the </span>
            <span className="text-foreground">terms and conditions</span>
          </FieldLabel>
        </Field>
        <Field>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending && <Spinner data-icon="inline-start" />}
            {pending ? "Creating account…" : `Create ${APP_CONFIG.name} account`}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
