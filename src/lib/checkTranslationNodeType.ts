import {TranslationNode, TranslationValues} from '../types/translations';

/**
 * Determines whether a provided value confirms with type TranslationsValues
 * @param {unknown} value - Value to check
 * @returns {boolean} - Type predicate indicating if a value confirms with type TranslationValues
 */
export function isTranslationValues(value: unknown): value is TranslationValues {
  if (value == null || typeof value !== "object" || Array.isArray(value)) return false;

  return Object.values(value).every(
    (v) => typeof v === 'string' || v === null || v === undefined
  );
}


/**
 * Determines whether a provided value confirms with type TranslationNode
 * @param {unknown} value - Value to check
 * @returns {boolean} - Type predicate indicating if a value confirms with type TranslationNode
 */
export function isTranslationNode(value: unknown): value is TranslationNode {
  if (value == null || typeof value !== "object") return false;

  return !isTranslationValues(value);
}
