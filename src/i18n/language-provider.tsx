"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider, useFormatter, useTranslations } from "next-intl";

import { directionFor, inlineEndSide, inlineStartSide, isTranslatedPath, type Locale } from "./locale";
import type { MessageScope } from "./messages";
import { setLocaleCookie } from "./set-locale";
import { messageById, type TranslationValues, translateStoredValue } from "./translate-value";

type DateInput = Date | string | number;

type CurrencyFormatOptions = {
  currency?: string;
  maximumFractionDigits?: number;
};

export type I18nContextValue = {
  active: boolean;
  locale: Locale;
  direction: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (id: string, values?: TranslationValues) => string;
  value: (scope: MessageScope, text: string) => string;
  formatNumber: (value: number) => string;
  formatCurrency: (amount: number, options?: CurrencyFormatOptions) => string;
  formatPercent: (value: number) => string;
  formatDate: (value: DateInput) => string;
  formatDateTime: (value: DateInput) => string;
  inlineStart: "left" | "right";
  inlineEnd: "left" | "right";
};

const I18nContext = createContext<I18nContextValue | null>(null);

function toDate(value: DateInput) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function I18nContextBridge({
  active,
  locale,
  messages,
  setLocale,
  children,
}: {
  active: boolean;
  locale: Locale;
  messages: Record<Locale, AbstractIntlMessages>;
  setLocale: (locale: Locale) => void;
  children: ReactNode;
}) {
  const translate = useTranslations();
  const format = useFormatter();
  const direction = directionFor(locale);

  const t = useCallback(
    (id: string, values?: TranslationValues) => (values ? translate(id, values) : translate(id)),
    [translate],
  );

  const value = useCallback(
    (scope: MessageScope, text: string) => translateStoredValue(locale, scope, text, messages.en, t),
    [locale, messages.en, t],
  );

  const context = useMemo<I18nContextValue>(
    () => ({
      active,
      locale,
      direction,
      setLocale,
      t,
      value,
      formatNumber: (amount) => format.number(amount),
      formatCurrency: (amount, options) =>
        format.number(amount, {
          style: "currency",
          currency: options?.currency ?? "USD",
          minimumFractionDigits: options?.maximumFractionDigits ?? 0,
          maximumFractionDigits: options?.maximumFractionDigits ?? 0,
        }),
      formatPercent: (amount) => format.number(amount, { style: "percent", maximumFractionDigits: 0 }),
      formatDate: (input) => {
        const date = toDate(input);
        if (!date) return String(input);
        const dateOnly = typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input);
        return format.dateTime(date, dateOnly ? { dateStyle: "medium", timeZone: "UTC" } : { dateStyle: "medium" });
      },
      formatDateTime: (input) => {
        const date = toDate(input);
        return date ? format.dateTime(date, { dateStyle: "medium", timeStyle: "short" }) : String(input);
      },
      inlineStart: inlineStartSide(direction),
      inlineEnd: inlineEndSide(direction),
    }),
    [active, direction, format, locale, setLocale, t, value],
  );

  return <I18nContext.Provider value={context}>{children}</I18nContext.Provider>;
}

export function LanguageProvider({
  children,
  initialLocale,
  messages,
  timeZone,
}: {
  children: ReactNode;
  initialLocale: Locale;
  messages: Record<Locale, AbstractIntlMessages>;
  timeZone: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const active = isTranslatedPath(pathname);
  const effectiveLocale: Locale = active ? locale : "en";

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useLayoutEffect(() => {
    document.documentElement.lang = effectiveLocale;
    document.documentElement.dir = directionFor(effectiveLocale);
  }, [effectiveLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      void setLocaleCookie(next).then(() => {
        void router.refresh();
      });
    },
    [router],
  );

  return (
    <NextIntlClientProvider
      locale={effectiveLocale}
      messages={messages[effectiveLocale]}
      timeZone={timeZone}
      onError={(error) => {
        if (error.code === "MISSING_MESSAGE") return;
        console.error(error);
      }}
      getMessageFallback={({ key, namespace }) => {
        const id = namespace ? `${namespace}.${key}` : key;
        return messageById(messages.en, id) ?? id;
      }}
    >
      <I18nContextBridge active={active} locale={effectiveLocale} messages={messages} setLocale={setLocale}>
        {children}
      </I18nContextBridge>
    </NextIntlClientProvider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside LanguageProvider");
  return context;
}

export function useLanguage() {
  return useI18n();
}
