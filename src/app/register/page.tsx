import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/app/(main)/auth/_components/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Create an account</CardTitle><CardDescription>Register with your email address.</CardDescription></CardHeader>
        <CardContent className="flex flex-col gap-5">
          <RegisterForm />
          <p className="text-center text-sm">Already have an account? <Link href="/login" className="underline underline-offset-2">Sign in</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
