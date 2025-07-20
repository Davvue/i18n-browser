import {TranslationList, TranslationNode, TranslationValues} from '../types/translations';

/**
 * Determines whether a provided value confirms with type TranslationsValues
 * @param {unknown} value - Value to check
 * @returns {boolean} - Type predicate indicating if a value confirms with type TranslationValues
 */
export function isTranslationValues(value: unknown): value is TranslationValues {
  if (value == null || typeof value !== "object") return false;

  return Object.values(value).every((v) => typeof v === 'string');
}


/**
 * Determines whether a provided value confirms with type TranslationList
 * @param {unknown} value - Value to check
 * @returns {boolean} - Type predicate indicating if a value confirms with type TranslationList
 */
export function isTranslationList(value: unknown): value is TranslationList {
  if (value == null || typeof value !== "object") return false;

  return (Array.isArray(value));
}


/**
 * Determines whether a provided value confirms with type TranslationNode
 * @param {unknown} value - Value to check
 * @returns {boolean} - Type predicate indicating if a value confirms with type TranslationNode
 */
export function isTranslationNode(value: unknown): value is TranslationNode {
  if (value == null || typeof value !== "object") return false;

  return !isTranslationList(value) && !isTranslationValues(value);
}
