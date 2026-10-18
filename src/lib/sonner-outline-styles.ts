import type { CSSProperties } from "react";

/** Outline info — from shadcn studio `sonner-13`. */
export const sonnerOutlineInfoStyle = {
  "--normal-bg": "var(--background)",
  "--normal-text": "light-dark(var(--color-sky-600), var(--color-sky-400))",
  "--normal-border": "light-dark(var(--color-sky-600), var(--color-sky-400))",
} as CSSProperties;

/** Outline success — from shadcn studio `sonner-14`. */
export const sonnerOutlineSuccessStyle = {
  "--normal-bg": "var(--background)",
  "--normal-text": "light-dark(var(--color-green-600), var(--color-green-400))",
  "--normal-border": "light-dark(var(--color-green-600), var(--color-green-400))",
} as CSSProperties;

/** Outline warning — from shadcn studio `sonner-15`. */
export const sonnerOutlineWarningStyle = {
  "--normal-bg": "var(--background)",
  "--normal-text": "light-dark(var(--color-amber-600), var(--color-amber-400))",
  "--normal-border": "light-dark(var(--color-amber-600), var(--color-amber-400))",
} as CSSProperties;

/** Outline error — same pattern as studio `sonner-16` (for failed operations). */
export const sonnerOutlineErrorStyle = {
  "--normal-bg": "var(--background)",
  "--normal-text": "light-dark(var(--color-red-600), var(--color-red-400))",
  "--normal-border": "light-dark(var(--color-red-600), var(--color-red-400))",
} as CSSProperties;
