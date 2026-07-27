import Plot from "react-plotly.js";
import { BASE_CONFIG, BASE_LAYOUT, PLOT_COLORS } from "./plotTheme";
import type { AssetSummary } from "@/types";

// Histogram of asset risk scores — shows where organizational risk
// concentrates, complementing the severity pie (which is alert-centric).
export function RiskDistributionChart({ data }: { data: AssetSummary[] }) {
  return (
    <Plot
      data={[
        {
          type: "histogram",
          x: data.map((a) => a.riskScore),
          xbins: { start: 0, end: 100, size: 10 },
          marker: { color: PLOT_COLORS.signal, opacity: 0.85 },
          hovertemplate: "Risk %{x}: %{y} assets<extra></extra>",
        },
      ]}
      layout={{
        ...BASE_LAYOUT,
        xaxis: { ...BASE_LAYOUT.xaxis, title: { text: "Risk score", font: { size: 10 } } },
        bargap: 0.1,
      }}
      config={BASE_CONFIG}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
