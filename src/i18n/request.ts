import { cookies, headers } from "next/headers";

import { getRequestConfig } from "next-intl/server";

import { getTimeZone, LOCALE_COOKIE, PATHNAME_HEADER, parseLocale, resolveLocale } from "./locale";
import { messages } from "./messages";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const pathname = headerStore.get(PATHNAME_HEADER) ?? "";
  const locale = resolveLocale(cookieLocale, pathname);

  return {
    locale,
    messages: messages[locale],
    timeZone: getTimeZone(),
  };
});
