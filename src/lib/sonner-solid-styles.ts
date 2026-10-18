import type { CSSProperties } from "react";

/** Solid info — from shadcn studio `sonner-17`. */
export const sonnerSolidInfoStyle = {
  "--normal-bg": "light-dark(var(--color-sky-600), var(--color-sky-400))",
  "--normal-text": "var(--color-white)",
  "--normal-border": "light-dark(var(--color-sky-600), var(--color-sky-400))",
} as CSSProperties;

/** Solid success — from shadcn studio `sonner-18`. */
export const sonnerSolidSuccessStyle = {
  "--normal-bg": "light-dark(var(--color-green-600), var(--color-green-400))",
  "--normal-text": "var(--color-white)",
  "--normal-border": "light-dark(var(--color-green-600), var(--color-green-400))",
} as CSSProperties;

/** Solid warning — from shadcn studio `sonner-19`. */
export const sonnerSolidWarningStyle = {
  "--normal-bg": "light-dark(var(--color-amber-600), var(--color-amber-400))",
  "--normal-text": "var(--color-white)",
  "--normal-border": "light-dark(var(--color-amber-600), var(--color-amber-400))",
} as CSSProperties;

/** Solid destructive — from shadcn studio `sonner-20`. */
export const sonnerSolidErrorStyle = {
  "--normal-bg": "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
  "--normal-text": "var(--color-white)",
  "--normal-border": "transparent",
} as CSSProperties;
