// src/utils/theme.ts
/**
 * Theme-related constants shared between Astro layouts and React hooks.
 */

export const ACCENT_COLORS = [
  "#2BB34A",
  "#16a34a",
  "#15803d",
  "#22c55e",
  "#4ade80",
] as const;

export type AccentColor = (typeof ACCENT_COLORS)[number];

export const DEFAULT_THEME: "light" | "dark" = "dark";
