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
 * A list of translations
 * @see TranslationValues
 */
export type TranslationList = TranslationValues[];


/**
 * A translation node either containing other nodes, lists, or values
 * @see TranslationList
 * @see TranslationValues
 */
export interface TranslationNode {
  [key: string]: TranslationNode | TranslationList | TranslationValues;
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
export type RawTranslation = Record<string | number, unknown>;


/**
 * The path to a translation key
 */
export type TranslationPath = (string | number)[];
