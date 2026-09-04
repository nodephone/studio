import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";
import * as motion from "./motion";

export const tokens = {
  colors,
  spacing,
  radius,
  motion,
  typography: {
    display: "text-3xl font-extrabold tracking-tight md:text-4xl",
    headingXl: "text-2xl font-bold tracking-tight md:text-3xl",
    headingLg: "text-xl font-bold tracking-tight",
    headingMd: "text-base font-semibold tracking-tight",
    body: "text-sm font-normal leading-relaxed",
    caption: "text-xs font-normal text-neutral-500 dark:text-neutral-400",
    mono: "font-mono text-xs tracking-normal",
  },
} as const;

export type DesignTokens = typeof tokens;
