/**
 * Turns an array object path into it's string representation
 * @param {TranslationPath} parts - The array object path
 * @returns {string} - The string representation for the provided object path
 */
export function formatTranslationPath(parts: (string | number)[]): string {
  return parts
    .map(p => (typeof p === 'number' ? `[${p}]` : p))
    .join('.')
    .replace(/\.\[/g, '[');
}
