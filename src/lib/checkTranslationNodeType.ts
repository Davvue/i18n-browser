import {TranslationList, TranslationNode, TranslationValues} from '../types/translations';

export function isTranslationValues(value: unknown): value is TranslationValues {
  if (value == null || typeof value !== "object") return false;

  return Object.values(value).every((v) => typeof v === 'string');
}

export function isTranslationList(value: unknown): value is TranslationList {
  if (value == null || typeof value !== "object") return false;

  return (Array.isArray(value));
}

export function isTranslationNode(value: unknown): value is TranslationNode {
  if (value == null || typeof value !== "object") return false;

  return !isTranslationList(value) && !isTranslationValues(value);
}
