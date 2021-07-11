export function startCase(text: string): string {
  return text
    .split(/-/)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(' ');
}
