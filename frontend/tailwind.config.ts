import type { Config } from "tailwindcss";

// Design tokens for the AI-Assisted Threat Detection Dashboard.
// Direction: a "night operations" console — near-black slate base (not pure
// black, which flattens depth cues security analysts rely on to scan a wall
// of cards), a single cool signal-blue for AI/system actions, and a
// dedicated severity ramp that is the actual data language of the product
// (severity color is information, not decoration).
const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces — layered slate, not flat gray, so cards/panels
        // read as physically stacked.
        surface: {
          0: "#0A0E14", // app background
          1: "#10151D", // panel background
          2: "#161C26", // card background
          3: "#1D2430", // raised / hovered card
          border: "#242C39",
        },
        // Signal blue — reserved for AI assistant, links, focus states,
        // and "system is actively doing something" indicators.
        signal: {
          DEFAULT: "#4C8DFF",
          dim: "#2C4E8C",
          bright: "#7BAAFF",
        },
        // Severity ramp — the core data vocabulary of a threat dashboard.
        severity: {
          critical: "#F0465C",
          high: "#F5883C",
          medium: "#F2C14E",
          low: "#4C8DFF",
          info: "#5B6472",
        },
        // Status states independent of severity (system/incident lifecycle)
        status: {
          success: "#33C481",
          warning: "#F2C14E",
          danger: "#F0465C",
          neutral: "#5B6472",
        },
        ink: {
          primary: "#E7EBF3",
          secondary: "#9AA5B4",
          tertiary: "#5B6472",
        },
      },
      fontFamily: {
        // Utility/UI face — neutral, high legibility at small sizes.
        sans: ["Inter", "system-ui", "sans-serif"],
        // Data/telemetry face — used for IDs, IPs, hashes, timestamps,
        // log lines: anything the analyst needs to scan character-by-character.
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(76,141,255,0.4), 0 0 24px -4px rgba(76,141,255,0.5)",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in": "fade-in 0.2s ease-out",
      },
      keyframes: {
        "pulse-ring": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
