import type { Metadata } from "next";

import { RegisterScreen } from "@/app/register/_components/register-screen";
import { APP_CONFIG } from "@/config/app-config";

export const metadata: Metadata = {
  title: "Create an account",
  description: `Create your ${APP_CONFIG.name} account.`,
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterPage() {
  return <RegisterScreen />;
}
