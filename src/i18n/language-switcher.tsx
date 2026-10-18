"use client";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { active, locale, setLocale } = useLanguage();
  if (!active) return null;
  const next = locale === "en" ? "ar" : "en";

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={() => setLocale(next)}
      aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      lang={next}
    >
      <Languages data-icon="inline-start" />
      {next === "ar" ? "العربية" : "English"}
    </Button>
  );
}
