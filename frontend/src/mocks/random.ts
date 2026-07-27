// Deterministic PRNG so mock data is stable across renders/reloads instead
// of reshuffling every time a component mounts (Math.random() would do that).
export function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(1337);

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function pickWeighted<T extends string>(weights: Record<T, number>): T {
  const entries = Object.entries(weights) as [T, number][];
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let r = rand() * total;
  for (const [key, w] of entries) {
    r -= w;
    if (r <= 0) return key;
  }
  return entries[0][0];
}

export function randInt(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

export function randomIp(): string {
  return `${randInt(1, 223)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`;
}

export function randomInternalIp(): string {
  return `10.${randInt(0, 4)}.${randInt(0, 255)}.${randInt(1, 254)}`;
}

export function randomPastTimestamp(maxHoursAgo: number): string {
  const ms = Date.now() - randInt(1, maxHoursAgo) * 60 * 60 * 1000 - randInt(0, 59) * 60000;
  return new Date(ms).toISOString();
}

export function randomCveId(): string {
  const year = pick(["2023", "2024", "2025", "2026"]);
  return `CVE-${year}-${randInt(1000, 49999)}`;
}

export function id(prefix: string, n: number): string {
  return `${prefix}-${String(n).padStart(5, "0")}`;
}
