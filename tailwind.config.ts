import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "oklch(var(--ink) / <alpha-value>)",
        muted: "oklch(var(--muted) / <alpha-value>)",
        bg: "oklch(var(--bg) / <alpha-value>)",
        surface: "oklch(var(--surface) / <alpha-value>)",
        primary: "oklch(var(--primary) / <alpha-value>)",
        accent: "oklch(var(--accent) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 44px oklch(var(--primary) / 0.18)",
        insetline: "inset 0 1px 0 oklch(1 0 0 / 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
