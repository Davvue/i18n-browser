import {Injectable, signal} from '@angular/core';
import {Locale, Locales} from '../../../types/locales';
import {
  RawTranslation, TranslationList,
  TranslationNode, TranslationPath,
  TranslationRoot, TranslationValues,
} from '../../../types/translations';
import {isTranslationList, isTranslationNode, isTranslationValues} from '../../../lib/checkTranslationNodeType';
import {TranslationMismatchError} from '../../../errors/TranslationMismatchError';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  /**
   * Array of the currently fully loaded locales
   */
  readonly loadedLocales = signal<Locales>([]);


  /**
   * Translation root with all loaded translations combined
   */
  readonly translations = signal<TranslationRoot>({});


  constructor() { }


  /**
   * Load the contents of a JSON file as translations
   * @param {Locale} locale - The locale identifier to add the translations for
   * @param {File} file - The file containing the translations
   * @throws {TypeError} - Thrown if the JSON data is invalid
   * @throws {SyntaxError} - See JSON.parse for details
   */
  async loadLocale(locale: Locale, file: File): Promise<void> {
    const fileContent = await file.text();
    const fileTranslations = await JSON.parse(fileContent);

    if (!fileTranslations) throw new TypeError();
    if (typeof fileTranslations !== "object") throw new TypeError("File translations must be an object");
    if (Array.isArray(fileTranslations)) throw new TypeError("Root translations must not be an array");

    const translationRoot = this.parseTranslations(locale, fileTranslations);
    const mergedTranslations = this.mergeTranslations(this.translations(), translationRoot, [...this.loadedLocales(), locale]);
    this.loadedLocales.update(prev => {
      if (prev.includes(locale)) return prev;
      return [...prev, locale];
    });

    this.translations.set(mergedTranslations);
  }


  /**
   * Parses raw file translations and inserts locale name before translation value
   * @param {Locale} locale - The current locale associated with the current file
   * @param {RawTranslation} rawTranslation - The raw translations object loaded from a file
   * @returns {TranslationNode} - A translation node parsed from the passed raw translations
   * @private
   * @method
   */
  private parseTranslations(locale: Locale, rawTranslation: RawTranslation): TranslationNode {
    const result: TranslationNode = {};

    for (const key of Object.keys(rawTranslation)) {
      const value = rawTranslation[key];
      if (value == null) continue;
      if (typeof value !== "object" && typeof value !== "string") continue;

      if (typeof value === "string") {
        result[key] = {[locale]: value};
      } else if (Array.isArray(value)) {
        result[key] = [];
        for (const item of value) result[key].push({[locale]: item});
      } else {
        result[key] = this.parseTranslations(locale, value as RawTranslation);
      }
    }

    return result;
  }


  /**
   * Deeply merges two translation nodes
   * @param {TranslationNode | undefined} a - Side A to merge with side B
   * @param {TranslationNode | undefined} b - Side B to merge with side A
   * @param {Locales} allLocales - List of all locales present in the provided sets
   * @param {TranslationPath} [path=["root"]] - The current path for the translation key
   * @throws {TranslationMismatchError} - If A and B define different structures for the same key, throws a TranslationMismatchError instead of merging translations incorrectly
   * @returns {TranslationNode} - A merged version of side A and side B
   * @private
   * @method
   */
  private mergeTranslations(
    a: TranslationNode | undefined,
    b: TranslationNode | undefined,
    allLocales: Locales,
    path: TranslationPath = ["root"],
  ): TranslationNode {
    if (a === undefined && b === undefined) return {};

    const out: TranslationNode = {};
    const keys = new Set([
      ...Object.keys(a ?? {}),
      ...Object.keys(b ?? {})
    ]);

    for (const key of keys) {
      const newPath = [...path, key];
      const aVal = a?.[key];
      const bVal = b?.[key];

      // ---- Same structural kind --------------------------------------------
      if (isTranslationNode(aVal) && isTranslationNode(bVal)) {
        out[key] = this.mergeTranslations(aVal, bVal, allLocales, newPath);
        continue;
      }
      if (isTranslationValues(aVal) && isTranslationValues(bVal)) {
        out[key] = this.mergeTranslationValues(aVal, bVal, allLocales, newPath);
        continue;
      }
      if (isTranslationList(aVal) && isTranslationList(bVal)) {
        out[key] = this.mergeTranslationLists(aVal, bVal, allLocales, newPath);
        continue;
      }

      // ---- One side missing -------------------------------------------------
      if (aVal === undefined && bVal !== undefined) {
        out[key] =
          isTranslationNode(bVal)
            ? this.mergeTranslations(undefined, bVal, allLocales, newPath)
            : isTranslationList(bVal)
              ? this.mergeTranslationLists(undefined, bVal, allLocales, newPath)
              : isTranslationValues(bVal)
                ? this.mergeTranslationValues(undefined, bVal, allLocales, newPath)
                : bVal; // primitive/null
        continue;
      }
      if (bVal === undefined && aVal !== undefined) {
        out[key] =
          isTranslationNode(aVal)
            ? this.mergeTranslations(aVal, undefined, allLocales, newPath)
            : isTranslationList(aVal)
              ? this.mergeTranslationLists(aVal, undefined, allLocales, newPath)
              : isTranslationValues(aVal)
                ? this.mergeTranslationValues(aVal, undefined, allLocales, newPath)
                : aVal;
        continue;
      }

      // ---- Structural mismatch ---------------------------------------------
      throw new TranslationMismatchError(newPath, this.describe(aVal), this.describe(bVal));
    }
    return out;
  }


  /**
   * Merges two sets of TranslationValues. Sets locale value to null, if not present in either set
   * @param {TranslationValues | undefined} a - Side A to merge with side B
   * @param {TranslationValues | undefined} b - Side B to merge with side A
   * @param {Locales} allLocales - List of all locales present in the provided sets
   * @param {TranslationPath} path - The current path for the translation key
   * @throws {TranslationMismatchError} - If A and B define different structures for the same key, throws a TranslationMismatchError instead of merging translations incorrectly
   * @returns {TranslationValues} - A merged version of side A and side B
   * @private
   * @method
   */
  private mergeTranslationValues(
    a: TranslationValues | undefined,
    b: TranslationValues | undefined,
    allLocales: Locales,
    path: TranslationPath,
  ): TranslationValues {
    if (a === undefined && b === undefined) return {};
    if (!isTranslationValues(a ?? {}) || !isTranslationValues(b ?? {})) {
      throw new TranslationMismatchError(path, 'TranslationValues', this.describe(a ?? b));
    }

    const out: TranslationValues = {};
    for (const locale of allLocales) {
      out[locale] = b?.[locale] ?? a?.[locale] ?? null;
    }
    return out;
  }


  /**
   * Merges two TranslationLists
   * @param {TranslationList | undefined} a - Side A to merge with side B
   * @param {TranslationList | undefined} b - Side B to merge with side A
   * @param {Locales} allLocales - List of all locales present in the provided sets
   * @param {TranslationPath} path - The current path for the translation key
   * @throws {TranslationMismatchError} - If A and B define different structures for the same key, throws a TranslationMismatchError instead of merging translations incorrectly
   * @returns {TranslationList} - A merged version of list A and list B
   * @private
   * @method
   */
  private mergeTranslationLists(
    a: TranslationList | undefined,
    b: TranslationList | undefined,
    allLocales: Locales,
    path: (string | number)[],
  ): TranslationList {
    if (a === undefined && b === undefined) return [];
    if (a && !isTranslationList(a)) throw new TranslationMismatchError(path, 'TranslationList', this.describe(a));
    if (b && !isTranslationList(b)) throw new TranslationMismatchError(path, 'TranslationList', this.describe(b));

    const max = Math.max(a?.length ?? 0, b?.length ?? 0);
    const out: TranslationList = [];

    for (let i = 0; i < max; i++) {
      out.push(
        this.mergeTranslationValues(a?.[i], b?.[i], allLocales, [...path, i])
      );
    }
    return out;
  }


  /**
   * Provides type description for translation types
   * @param {unknown} val - A value to determine the type of
   * @returns {string} - A string containing the type name of the value passed as val
   * @private
   * @method
   */
  private describe(val: unknown): string {
    if (isTranslationNode(val))
      return 'TranslationNode';
    if (isTranslationValues(val))
      return 'TranslationValues';
    if (Array.isArray(val))
      return 'TranslationList';
    return typeof val;
  }
}
