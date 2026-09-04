// Strict 8px Grid Scale
export const spacing = {
  "3xs": "2px",
  "2xs": "4px",
  xs: "8px",   // 1 unit
  sm: "12px",
  md: "16px",  // 2 units
  lg: "24px",  // 3 units
  xl: "32px",  // 4 units
  "2xl": "48px", // 6 units
  "3xl": "64px", // 8 units
} as const;

export type SpacingTokens = typeof spacing;
