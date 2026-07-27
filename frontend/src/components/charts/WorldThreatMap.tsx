import Plot from "react-plotly.js";
import { BASE_CONFIG, PLOT_COLORS } from "./plotTheme";
import type { ThreatMapPoint } from "@/types";

export function WorldThreatMap({ data }: { data: ThreatMapPoint[] }) {
  return (
    <Plot
      data={[
        {
          type: "scattergeo",
          lat: data.map((d) => d.lat),
          lon: data.map((d) => d.lng),
          text: data.map((d) => `${d.country}: ${d.eventCount} events (${d.severity})`),
          mode: "markers",
          marker: {
            size: data.map((d) => Math.max(8, Math.sqrt(d.eventCount) * 2.2)),
            color: data.map((d) => PLOT_COLORS.severity[d.severity]),
            opacity: 0.85,
            line: { color: PLOT_COLORS.surface1, width: 1 },
          },
          hovertemplate: "%{text}<extra></extra>",
        },
      ]}
      layout={{
        paper_bgcolor: "transparent",
        margin: { l: 0, r: 0, t: 0, b: 0 },
        geo: {
          showland: true,
          landcolor: PLOT_COLORS.surface2,
          showocean: true,
          oceancolor: PLOT_COLORS.surface1,
          showcountries: true,
          countrycolor: PLOT_COLORS.border,
          coastlinecolor: PLOT_COLORS.border,
          showframe: false,
          projection: { type: "natural earth" },
          bgcolor: "transparent",
        },
      }}
      config={BASE_CONFIG}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
    />
  );
}
