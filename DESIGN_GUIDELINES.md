# Design Guidelines — Manisa Travel Admin

This file documents the visual language and design decisions that have emerged from building and refining screens in this project. It is not a generic design system — it records patterns that have been repeatedly validated through real screens (Dashboard, Logistics, Flights) so future work stays consistent with them.

Read this file before designing or modifying any screen. Then inspect the closest existing screen to confirm the pattern still applies before reusing it.

## 1. Layout: break the grid on purpose

Avoid the default "four identical KPI cards in a row" dashboard layout. Prefer asymmetry:

- Vary card width and height instead of making every card the same size.
- Vary visual weight — some sections should clearly matter more than others.
- Mix large, medium, and small sections in the same view.
- A layout should read as one composed arrangement, not a repeated grid of identical components.

## 2. Card composition varies with the data

Not every card has to follow `Title → Number → Description`. A card can combine:

- A primary metric
- A comparison or trend
- Contextual information
- A mini visualization (sparkline, progress ring, mini chart)
- An image
- A breakdown of sub-values
- Actions tied directly to that data

Let the nature of the data decide the card's internal structure — cards do not need to be internally consistent with each other when their data differs.

## 3. Imagery

Use real imagery inside cards when it adds meaning — destinations, flights/aircraft, travelers, tourism. Do not turn every card into an image card.

For hero/featured cards using a background image:

- Light overlay/gradient so the image doesn't fight the content.
- A strong dark gradient + soft blur concentrated toward the bottom of the image, fading into the card's background color.
- Keep the subject (e.g. aircraft, clouds, destination) visible in the upper/middle area — don't blur the whole image uniformly.
- Text and key info must stay clearly readable on top of the image.

Reference implementation: the selected-flight hero card in `src/app/(main)/dashboard/flights/_components/flight-details-panel.tsx`.

## 4. Hero / featured cards can break the layout

Important cards are allowed to intentionally disrupt the grid rhythm, for example:

- Three related KPIs grouped into one connected card, while a fourth, more important KPI gets its own standalone, visually distinct card.
- That standalone card can use a travel photo as its background.

The goal is visual rhythm, not four repeated KPI boxes.

## 5. Data visualization: match the chart to the meaning

Don't reuse the same chart type everywhere. Pick the visualization based on what the data means:

| Data meaning | Visualization |
|---|---|
| Trend over time | Line / Area |
| Comparison | Bar |
| Composition / distribution within a total | Stacked Bar |
| Share of a whole | Donut / Radial |
| Real progress toward a goal/capacity | Progress |
| Compact trend inside a small space | Sparkline |
| Schedules / sequences over time | Timeline |
| Ranking (e.g. top destinations) | Ranked List |
| People (e.g. travelers, passengers) | Avatar Group |

Never add a chart purely for decoration — it must communicate a real value.

## 6. Color: Manisa Travel brand identity

Core brand palette:

- **Sea / Teal** — primary
- **Coral / Orange** — accent
- **Sun / Yellow** — secondary accent

Use these with intent, not everywhere. Apply brand colors to:

- Primary buttons and calls to action
- Selected/active states
- Navigation (active item, key highlights)
- Emphasis on important information
- Travel-specific elements (routes, flights, destinations)
- Charts, when it aids meaning

Status colors stay semantic and independent of the brand palette:

- Green → Success
- Amber → Warning
- Red → Error
- Blue → Information

## 7. Travel identity

The product must read clearly as a Travel & Tourism product, not a generic SaaS admin panel. Favor:

- Destination and flight imagery
- Route visuals (e.g. origin → destination with a flight path)
- Traveler avatars
- Travel-related iconography
- Real flight/booking details over abstract metrics

Avoid falling back to generic admin-dashboard treatment when a travel-specific visual would communicate more.

## 8. Information density

Screens should be information-rich without becoming cluttered:

- Compact information modules
- Clear hierarchy (size, weight, color used deliberately)
- Deliberate whitespace
- Logical grouping of related data
- Progressive disclosure — don't show everything at once
- Drawers and detail panels for secondary depth

## 9. Detail panels (split layout)

For operational screens, prefer a split layout when it fits the task:

```
List / Calendar / Operations  +  Selected Item Details
```

Examples already established in this project:

- Flights → flight list + selected flight details (`src/app/(main)/dashboard/flights/`)
- Logistics → shipment list + selected shipment details (`src/app/(main)/dashboard/logistics/`)

Apply the same pattern to future operational screens (e.g. Bookings, Ticketing) where a list-then-detail relationship exists.

## 10. Shared visual language across pages

Every page should feel like part of the same product:

- Consistent typography scale
- Consistent spacing
- A shared card vocabulary
- Consistent treatment of status/badges
- The same brand colors
- Consistent image treatment (overlays, gradients, radius)
- Consistent border and radius values

This does not mean every page must use an identical layout — only that the visual *language* stays shared.

## 11. Responsive design

Don't just stack everything vertically on mobile. Recompose the layout deliberately:

- Sheets/Drawers instead of always-visible side panels (see the flight details panel, which becomes a `Sheet` on mobile).
- Collapsible panels for secondary information.
- Compact summaries instead of full desktop density.
- Reordered card arrangements suited to a single column.

## 12. General principle

The interface should look intentionally designed, not like repeated components dropped into a grid. Content determines composition.

When designing a new screen:

1. Understand the page's purpose.
2. Identify the most important information.
3. Choose the right visual hierarchy.
4. Break repetitive patterns where it helps clarity.
5. Add travel-relevant visuals where they add meaning.
6. Reuse the existing component language (shadcn primitives already in `src/components/ui/`).
7. Keep the result consistent with the rest of the product.

## For future AI agents

- Read this file first.
- Inspect the closest existing screen before designing a new one.
- Infer the current visual language from real, already-built screens rather than defaults.
- Preserve this design philosophy instead of reverting to generic, repetitive admin-dashboard patterns.
- Update this file when a new design decision proves itself repeatedly across screens — don't turn every one-off note into a rule.
