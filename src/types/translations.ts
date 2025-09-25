import {type Locale} from './locales';

/**
 * The translation value
 */
export type TranslationValue = string | null;


/**
 * The different locales of a translation key
 * @see TranslationValue
 * @see Locale
 */
export interface TranslationValues {
  [key: Locale]: TranslationValue;
}


/**
 * A translation node either containing other nodes or values
 * @see TranslationValues
 */
export interface TranslationNode {
  [key: string]: TranslationNode | TranslationValues;
}


/**
 * The root translation containing all namespaces
 * @see {TranslationNode}
 * @alias TranslationNode
 */
export type TranslationRoot = TranslationNode;


/**
 * Raw translations object coming from a file
 */
export type RawTranslation = Record<string, unknown>;


/**
 * The path to a translation key
 */
export type TranslationPath = string[];
