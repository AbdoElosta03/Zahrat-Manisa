import type { Metadata } from "next";

import { LoginScreen } from "@/app/login/_components/login-screen";
import { APP_CONFIG } from "@/config/app-config";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to the ${APP_CONFIG.name} admin dashboard.`,
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return <LoginScreen />;
}
