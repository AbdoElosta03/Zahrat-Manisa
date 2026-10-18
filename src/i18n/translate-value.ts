import type { AbstractIntlMessages } from "next-intl";

import type { Locale } from "./locale";
import type { MessageScope } from "./messages";

export type TranslationValues = Record<string, string | number | Date>;

type Translate = (id: string, values?: TranslationValues) => string;

function namespaceMessages(catalog: AbstractIntlMessages, scope: string) {
  const table = catalog[scope];
  if (!table || typeof table !== "object") return undefined;
  return Object.fromEntries(
    Object.entries(table).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
}

export function messageById(catalog: AbstractIntlMessages, id: string) {
  const [scope, key] = id.split(".");
  if (!scope || !key) return undefined;
  return namespaceMessages(catalog, scope)?.[key];
}

export function translateStoredValue(
  locale: Locale,
  scope: MessageScope,
  value: string,
  english: AbstractIntlMessages,
  translate: Translate,
): string {
  if (locale === "en") return value;

  const gateMatch = /^Gate ([A-Z0-9]+) assigned for departure\.$/.exec(value);
  if (gateMatch) return translate("common.gateAssignedDeparture", { gate: gateMatch[1] });

  const cardMatch = /^(Visa|Mastercard) ending (\d+)$/.exec(value);
  if (cardMatch) {
    const brand = translateStoredValue(locale, "common", cardMatch[1], english, translate);
    return translate("common.cardEnding", { brand, last4: cardMatch[2] });
  }

  const comparedMatch = /^(.+) than last month$/.exec(value);
  if (comparedMatch) return `${comparedMatch[1]} ${translate("finance.thanLastMonth")}`;

  for (const candidate of [scope, "common"] as const) {
    const found = Object.entries(namespaceMessages(english, candidate) ?? {}).find(([, text]) => text === value);
    if (found) return translate(`${candidate}.${found[0]}`);
  }

  return value;
}
