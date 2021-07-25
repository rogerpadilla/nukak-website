export function titleCase(text: string): string {
  const acronyms: { [p: string]: true } = { api: true };
  return text
    .split(/-/)
    .map((word) => (acronyms[word] ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}
