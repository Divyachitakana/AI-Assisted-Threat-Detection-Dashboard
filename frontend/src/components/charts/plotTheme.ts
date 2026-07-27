import type { Layout, Config } from "plotly.js";

// Mirrors the Tailwind tokens in tailwind.config.ts so charts never look
// like a bolted-on library with its own default theme.
export const PLOT_COLORS = {
  surface1: "#10151D",
  surface2: "#161C26",
  border: "#242C39",
  inkPrimary: "#E7EBF3",
  inkSecondary: "#9AA5B4",
  inkTertiary: "#5B6472",
  signal: "#4C8DFF",
  severity: {
    critical: "#F0465C",
    high: "#F5883C",
    medium: "#F2C14E",
    low: "#4C8DFF",
    info: "#5B6472",
  },
};

export const BASE_LAYOUT: Partial<Layout> = {
  paper_bgcolor: "transparent",
  plot_bgcolor: "transparent",
  font: { family: "Inter, system-ui, sans-serif", color: PLOT_COLORS.inkSecondary, size: 11 },
  margin: { l: 40, r: 16, t: 8, b: 32 },
  xaxis: {
    gridcolor: PLOT_COLORS.border,
    zerolinecolor: PLOT_COLORS.border,
    color: PLOT_COLORS.inkTertiary,
    tickfont: { size: 10 },
  },
  yaxis: {
    gridcolor: PLOT_COLORS.border,
    zerolinecolor: PLOT_COLORS.border,
    color: PLOT_COLORS.inkTertiary,
    tickfont: { size: 10 },
  },
  legend: {
    orientation: "h",
    y: -0.2,
    font: { color: PLOT_COLORS.inkSecondary, size: 10 },
  },
  hoverlabel: {
    bgcolor: PLOT_COLORS.surface2,
    bordercolor: PLOT_COLORS.border,
    font: { color: PLOT_COLORS.inkPrimary, size: 11 },
  },
};

export const BASE_CONFIG: Partial<Config> = {
  displayModeBar: false,
  responsive: true,
};
