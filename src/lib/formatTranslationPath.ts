import {TranslationPath} from '../types/translations';

/**
 * Turns an array object path into it's string representation
 * @param {TranslationPath} parts - The array object path
 * @returns {string} - The string representation for the provided object path
 */
export function formatTranslationPath(parts: TranslationPath[]): string {
  return parts
    .join('.')
    .replace(/\.\[/g, '[');
}
