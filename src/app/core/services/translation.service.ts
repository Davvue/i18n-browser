import {Injectable, signal} from '@angular/core';
import {Locale, Locales} from '../../../types/locales';
import {
  RawTranslation,
  TranslationNode,
  TranslationRoot,
} from '../../../types/translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  readonly loadedLocales = signal<Locales>([]);
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

    this.translations.set(translationRoot);
  }


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
}
