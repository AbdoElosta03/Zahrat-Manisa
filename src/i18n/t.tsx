"use client";

import { useI18n } from "./language-provider";
import type { MessageScope } from "./messages";

export function T({ id, values }: { id: string; values?: Record<string, string | number | Date> }) {
  const { t } = useI18n();
  return t(id, values);
}

export function V({ scope, text }: { scope: MessageScope; text: string }) {
  const { value } = useI18n();
  return value(scope, text);
}
