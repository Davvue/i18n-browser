import {formatTranslationPath} from '../lib/formatTranslationPath';

export class TranslationMismatchError extends Error {
  readonly path: string;

  constructor(path: (string | number)[], expected: string, actual: string) {
    super(
      `Structure mismatch at "${formatTranslationPath(path)}": ` +
      `expected ${expected}, received ${actual}`
    );
    this.name = 'TranslationMergeError';
    this.path = formatTranslationPath(path);
  }
}
