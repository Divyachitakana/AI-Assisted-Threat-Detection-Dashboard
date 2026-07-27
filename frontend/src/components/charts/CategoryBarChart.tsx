import Plot from "react-plotly.js";
import { BASE_CONFIG, BASE_LAYOUT, PLOT_COLORS } from "./plotTheme";
import type { ThreatCategoryCount } from "@/types";

export function CategoryBarChart({ data }: { data: ThreatCategoryCount[] }) {
  const sorted = [...data].sort((a, b) => a.count - b.count);

  return (
    <Plot
      data={[
        {
          type: "bar",
          orientation: "h",
          x: sorted.map((d) => d.count),
          y: sorted.map((d) => d.category),
          marker: { color: PLOT_COLORS.signal },
          hovertemplate: "%{y}: %{x}<extra></extra>",
        },
      ]}
      layout={{
        ...BASE_LAYOUT,
        margin: { l: 160, r: 16, t: 8, b: 32 },
        yaxis: { ...BASE_LAYOUT.yaxis, automargin: true },
      }}
      config={BASE_CONFIG}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
