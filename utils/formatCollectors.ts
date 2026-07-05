export default function formatCollectors(n: number): string {
  if (n >= 1000) {
    return `${(Math.round(n / 100) / 10).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(n);
}
