interface RiskGaugeProps {
  score: number; // 0-100
  size?: number;
  label?: string;
}

function scoreColor(score: number): string {
  if (score >= 75) return "#F0465C";
  if (score >= 50) return "#F5883C";
  if (score >= 25) return "#F2C14E";
  return "#33C481";
}

export function RiskGauge({ score, size = 96, label = "Risk Score" }: RiskGaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const color = scoreColor(clamped);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#242C39" strokeWidth={8} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={8}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-ink-primary tabular-nums">{clamped}</span>
        </div>
      </div>
      {label && <span className="text-[11px] text-ink-tertiary">{label}</span>}
    </div>
  );
}
