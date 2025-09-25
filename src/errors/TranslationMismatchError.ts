import {formatTranslationPath} from '../lib/formatTranslationPath';
import {TranslationPath} from '../types/translations';

/**
 * An error indicating a structural mismatch between translations
 * @class
 */
export class TranslationMismatchError extends Error {
  /**
   * The path to the key causing the translation mismatch to occur
   * @readonly
   */
  readonly path: string;

  constructor(path: TranslationPath, expected: string, actual: string) {
    super(
      `Structure mismatch at "${formatTranslationPath(path)}": ` +
      `expected ${expected}, received ${actual}`
    );
    this.name = 'TranslationMismatchError';
    this.path = formatTranslationPath(path);
  }
}
