export function normalizeDomain(input: string): string {
  const value = input.trim().toLowerCase();
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
