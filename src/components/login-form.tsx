"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentProps, type FormEvent, useState } from "react";

import { cn } from "cn";
import { toast } from "sonner";

import { useSessionMutations } from "@/app/(main)/dashboard/_components/access/access.mutations";
import { ManisaTravelMark } from "@/components/brand/manisa-travel-mark";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { APP_CONFIG } from "@/config/app-config";
import { getApiErrorMessage } from "@/lib/api/api-error";

const MANISA_TRAVEL_LOGO_SRC = "/logo/Manisa Travel Sun and Waves Logo.png";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSessionMutations();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await login.mutateAsync({ email, password });
      if ("transaction_token" in result) {
        toast.info("Terms acceptance required", { description: "Your account must accept the current terms before sign-in." });
        return;
      }
      if ("challenge_token" in result) {
        toast.info("Verification required", { description: "Your account requires MFA verification before sign-in." });
        return;
      }
      toast.success("Signed in");
      router.replace("/dashboard/default");
    } catch (error) {
      toast.error("Unable to sign in", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(event) => void handleSubmit(event)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-3 text-center">
                <ManisaTravelMark className="size-10" aria-label={APP_CONFIG.name} />
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">Sign in to {APP_CONFIG.name} admin</p>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" required
                  value={email} onChange={(event) => setEmail(event.target.value)} disabled={login.isPending} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link href="/forgot-password" className="ms-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" autoComplete="current-password" required
                  value={password} onChange={(event) => setPassword(event.target.value)} disabled={login.isPending} />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={login.isPending}>
                  {login.isPending && <Spinner data-icon="inline-start" />}
                  {login.isPending ? "Signing in…" : "Login"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                New here? <Link href="/register" className="underline underline-offset-2">Create an account</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden min-h-[320px] overflow-hidden bg-muted md:flex md:items-center md:justify-center md:p-10">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-sun/20 via-muted to-brand-sea/25 dark:from-brand-sun/15 dark:via-muted/90 dark:to-brand-sea/30" />
            <img src={MANISA_TRAVEL_LOGO_SRC} alt="Manisa Travel"
              className="relative z-10 w-full max-w-[min(100%,280px)] object-contain" />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">{APP_CONFIG.copyright}</FieldDescription>
    </div>
  );
}
