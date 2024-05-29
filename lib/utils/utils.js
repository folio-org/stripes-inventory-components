import { advancedSearchQueryToRows } from '@folio/stripes/smart-components';

import {
  queryIndexes,
  fieldSearchConfigurations,
} from '../constants';

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

export function getQueryTemplate(queryIndex, indexes) {
  const searchableIndex = indexes.find(({ value, subIndexes }) => {
    if (subIndexes) {
      return subIndexes.some(subIndex => subIndex.value === queryIndex);
    }

    return value === queryIndex;
  });

  return searchableIndex?.queryTemplate;
}

export const getTemplateForSelectedFromBrowseRecord = (queryParams, queryIndex, queryValue) => {
  if (!queryParams?.selectedBrowseResult) {
    return null;
  }

  if (queryIndex === queryIndexes.CONTRIBUTOR) {
    const escapedQueryValue = queryValue.replaceAll('"', '\\"');

    return `contributors.name==/string "${escapedQueryValue}"`;
  }

  return null;
};

const getAdvancedSearchQueryTemplate = (queryIndex, matchOption, query) => {
  const template = fieldSearchConfigurations[queryIndex]?.[matchOption];

  return typeof template === 'function'
    ? template({ query })
    : template;
};

export const getAdvancedSearchTemplate = (queryValue) => {
  return advancedSearchQueryToRows(queryValue).reduce((acc, row) => {
    const rowTemplate = getAdvancedSearchQueryTemplate(row.searchOption, row.match, row.query);

    if (!rowTemplate) {
      return acc;
    }

    const rowQuery = rowTemplate.replaceAll('%{query.query}', row.query);

    const formattedRow = `${row.bool} ${rowQuery}`.trim();
    return `${acc} ${formattedRow}`;
  }, '').trim();
};
