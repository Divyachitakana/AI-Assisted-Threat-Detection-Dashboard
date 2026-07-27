import Plot from "react-plotly.js";
import { BASE_CONFIG, BASE_LAYOUT, PLOT_COLORS } from "./plotTheme";
import type { AttackTrendPoint } from "@/types";

export function TrendLineChart({ data }: { data: AttackTrendPoint[] }) {
  const x = data.map((d) => d.timestamp);

  const series: Array<{ key: keyof AttackTrendPoint; name: string; color: string }> = [
    { key: "critical", name: "Critical", color: PLOT_COLORS.severity.critical },
    { key: "high", name: "High", color: PLOT_COLORS.severity.high },
    { key: "medium", name: "Medium", color: PLOT_COLORS.severity.medium },
    { key: "low", name: "Low", color: PLOT_COLORS.severity.low },
  ];

  return (
    <Plot
      data={series.map((s) => ({
        type: "scatter",
        mode: "lines",
        name: s.name,
        x,
        y: data.map((d) => d[s.key]),
        line: { color: s.color, width: 2, shape: "spline" },
        stackgroup: "one",
        hovertemplate: `${s.name}: %{y}<extra></extra>`,
      }))}
      layout={{ ...BASE_LAYOUT, xaxis: { ...BASE_LAYOUT.xaxis, type: "date" } }}
      config={BASE_CONFIG}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
