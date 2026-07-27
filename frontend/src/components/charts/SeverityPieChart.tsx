import Plot from "react-plotly.js";
import { BASE_CONFIG, BASE_LAYOUT, PLOT_COLORS } from "./plotTheme";
import type { SeverityDistribution } from "@/types";

const SEVERITY_LABELS: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  info: "Info",
};

export function SeverityPieChart({ data }: { data: SeverityDistribution[] }) {
  const colors = data.map((d) => PLOT_COLORS.severity[d.severity]);

  return (
    <Plot
      data={[
        {
          type: "pie",
          labels: data.map((d) => SEVERITY_LABELS[d.severity]),
          values: data.map((d) => d.count),
          hole: 0.62,
          marker: { colors, line: { color: PLOT_COLORS.surface1, width: 2 } },
          textinfo: "none",
          hovertemplate: "%{label}: %{value} (%{percent})<extra></extra>",
        },
      ]}
      layout={{
        ...BASE_LAYOUT,
        margin: { l: 0, r: 0, t: 0, b: 0 },
        showlegend: true,
        legend: { ...BASE_LAYOUT.legend, orientation: "v", x: 1, y: 0.5 },
      }}
      config={BASE_CONFIG}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
