// Simulated network latency for mock services so loading states/skeletons
// are actually exercised during development. Remove once real endpoints
// (via apiClient.ts) replace these functions.
export function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
