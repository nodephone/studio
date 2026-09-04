export const colors = {
  // Light Mode Tokens
  light: {
    background: "#fafafa",
    surface: "#ffffff",
    surfaceElevated: "#f4f4f5",
    border: "#e4e4e7",
    borderHover: "#d4d4d8",
    primary: "#09090b",
    primaryForeground: "#ffffff",
    textPrimary: "#09090b",
    textSecondary: "#71717a",
    textMuted: "#a1a1aa",
    accent: "#10b981", // Emerald accent
    accentForeground: "#ffffff",
    success: "#10b981",
    successBackground: "rgba(16, 185, 129, 0.1)",
    warning: "#f59e0b",
    warningBackground: "rgba(245, 158, 11, 0.1)",
    danger: "#ef4444",
    dangerBackground: "rgba(239, 68, 68, 0.1)",
    info: "#3b82f6",
    infoBackground: "rgba(59, 130, 246, 0.1)",
  },

  // Dark Mode Tokens
  dark: {
    background: "#09090b",
    surface: "#121215",
    surfaceElevated: "#18181b",
    border: "#27272a",
    borderHover: "#3f3f46",
    primary: "#f4f4f5",
    primaryForeground: "#09090b",
    textPrimary: "#f4f4f5",
    textSecondary: "#a1a1aa",
    textMuted: "#71717a",
    accent: "#10b981", // Emerald accent
    accentForeground: "#09090b",
    success: "#34d399",
    successBackground: "rgba(52, 211, 153, 0.15)",
    warning: "#fbbf24",
    warningBackground: "rgba(251, 191, 36, 0.15)",
    danger: "#f87171",
    dangerBackground: "rgba(248, 113, 113, 0.15)",
    info: "#60a5fa",
    infoBackground: "rgba(96, 165, 250, 0.15)",
  },
} as const;

export type ColorTokens = typeof colors.light;
