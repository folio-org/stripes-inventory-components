/**
 * Accent Fold
 *
 * For example:
 * LÒpez => Lopez
 *
 * Link:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 */
export const accentFold = (str = '') => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
