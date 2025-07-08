import {type Locale} from './locales';

export type TranslationValue = string;

export interface TranslationValues {
  [key: Locale]: TranslationValue;
}

export interface TranslationList {
  [key: number]: TranslationValues;
}

export interface TranslationNode {
  [key: string]: TranslationNode | TranslationList | TranslationValues;
}

export type TranslationRoot = TranslationNode;

export type RawTranslation = Record<string, unknown>;
