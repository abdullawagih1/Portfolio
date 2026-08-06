import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAFAF7",
          alt: "#F2F1EB",
          dark: "#0E1220",
          "dark-alt": "#151A2B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#161C2E",
        },
        ink: {
          DEFAULT: "#11162A",
          soft: "#4A5169",
          faint: "#8A90A3",
          inverse: "#F5F6FA",
        },
        line: {
          DEFAULT: "#E3E2DA",
          dark: "#262C42",
        },
        primary: {
          50: "#EEF3FF",
          100: "#DCE7FF",
          200: "#B7CBFF",
          300: "#8CA9FA",
          400: "#5C81ED",
          500: "#3560DA",
          600: "#2247BE",
          700: "#1C3A9C",
          800: "#182F79",
          900: "#152660",
        },
        accent: {
          50: "#E9FBF6",
          100: "#CDF5E8",
          200: "#9BE9D3",
          300: "#63D5B8",
          400: "#33BA9C",
          500: "#159C81",
          600: "#0F8268",
          700: "#0C6A55",
          800: "#0A5645",
          900: "#08453A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, var(--tw-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--tw-grid-line) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.015)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
