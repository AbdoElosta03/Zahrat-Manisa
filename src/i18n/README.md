# Dashboard translations

Language and direction come from the `dashboard_locale` cookie before the page is painted. `next-intl` loads the messages, and Arabic with `dir="rtl"` is applied only on the translated dashboard screens: overview, finance, bookings, flights, ticketing, cancellations, refunds, customers, support, and transactions. Other routes stay English and left-to-right.

Messages are split by namespace:

```text
src/i18n/messages/en/
src/i18n/messages/ar/
```

Each folder has `common`, `navigation`, `default`, `finance`, `bookings`, `flights`, `ticketing`, `cancellations`, `refunds`, `customers`, `support`, and `transactions`. Keys stay stable, for example `finance.upcomingPayments`.

## New screens

1. Add the route name to `translatedPaths` in `src/i18n/locale.ts` when that screen is ready for Arabic.
2. Add the same keys under `src/i18n/messages/en/<namespace>.json` and `src/i18n/messages/ar/<namespace>.json`.
3. In a Client Component, use `useI18n()`:

```tsx
const { locale, direction, t, formatCurrency, formatDate, inlineEnd } = useI18n();

t("bookings.tripPriceLine", { count: passengerCount });
formatCurrency(12400);
formatDate(departure);
```

4. In a Server Component, use `getTranslations()` and `getFormatter()` from `next-intl/server`.
5. Prefer `start`/`end`, `ms`/`me`, and `ps`/`pe`. Place sidebars on `inlineStart` and detail sheets on `inlineEnd`.
6. Keep names, booking IDs, flight codes, and similar identifiers as data.

`<T id="screen.key" />` and `<V scope="screen" text={item.label} />` remain for existing screens. `<V>` still maps stored English labels. New copy should use a message key instead of `<V>`.

`formatPercent` expects a ratio: `0.12` renders as 12%. Currency defaults to USD with no decimal places, matching the current dashboard figures. The currency itself is not a confirmed product decision.
