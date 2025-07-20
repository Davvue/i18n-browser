import {type Locale} from './locales';

export type TranslationValue = string | null;

export interface TranslationValues {
  [key: Locale]: TranslationValue;
}

export type TranslationList = TranslationValues[];

export interface TranslationNode {
  [key: string]: TranslationNode | TranslationList | TranslationValues;
}

export type TranslationRoot = TranslationNode;

export type RawTranslation = Record<string | number, unknown>;
