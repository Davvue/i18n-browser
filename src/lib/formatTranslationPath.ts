export function formatTranslationPath(parts: (string | number)[]): string {
  return parts
    .map(p => (typeof p === 'number' ? `[${p}]` : p))
    .join('.')
    .replace(/\.\[/g, '[');
}
