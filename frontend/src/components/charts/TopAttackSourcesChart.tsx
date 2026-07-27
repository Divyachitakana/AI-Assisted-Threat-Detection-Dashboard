import Plot from "react-plotly.js";
import { BASE_CONFIG, BASE_LAYOUT, PLOT_COLORS } from "./plotTheme";
import type { TopAttackSource } from "@/types";

export function TopAttackSourcesChart({ data }: { data: TopAttackSource[] }) {
  const sorted = [...data].sort((a, b) => a.attackCount - b.attackCount);

  return (
    <Plot
      data={[
        {
          type: "bar",
          orientation: "h",
          x: sorted.map((d) => d.attackCount),
          y: sorted.map((d) => `${d.ip} (${d.country})`),
          marker: {
            color: sorted.map((d) => d.riskScore),
            colorscale: [
              [0, PLOT_COLORS.severity.low],
              [0.5, PLOT_COLORS.severity.medium],
              [1, PLOT_COLORS.severity.critical],
            ],
          },
          hovertemplate: "%{y}<br>Attacks: %{x}<extra></extra>",
        },
      ]}
      layout={{
        ...BASE_LAYOUT,
        margin: { l: 168, r: 16, t: 8, b: 32 },
        yaxis: { ...BASE_LAYOUT.yaxis, automargin: true },
      }}
      config={BASE_CONFIG}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
