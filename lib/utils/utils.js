import template from 'lodash/template';

import { advancedSearchQueryToRows } from '@folio/stripes/smart-components';

import {
  queryIndexes,
  fieldSearchConfigurations,
  segments,
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
  const queryTemplate = fieldSearchConfigurations[queryIndex]?.[matchOption];

  return typeof queryTemplate === 'function'
    ? queryTemplate({ query })
    : queryTemplate;
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

export const getDefaultQindex = (segment) => {
  const defaultQindex = {
    [segments.instances]: queryIndexes.INSTANCE_KEYWORD,
    [segments.holdings]: queryIndexes.HOLDINGS_KEYWORD,
    [segments.items]: queryIndexes.ITEMS_KEYWORD,
  };

  return defaultQindex[segment] || queryIndexes.INSTANCE_KEYWORD;
};

export const isConsortiaEnv = stripes => stripes.hasInterface('consortia') ?? false;

export function getCurrentFilters(filtersStr) {
  if (!filtersStr) {
    return undefined;
  }

  return filtersStr
    .split(',')
    .reduce((filters, filter) => {
      const [name, value] = filter.split('.');
      filters[name] = filters[name] || [];
      filters[name].push(value);
      return filters;
    }, {});
}

export function getIsbnIssnTemplate(queryTemplate, identifierTypes, queryIndex) {
  const identifierType = identifierTypes
    .find(({ name }) => name.toLowerCase() === queryIndex);
  const identifierTypeId = identifierType?.id?.['identifier-type-not-found'];

  return template(queryTemplate)({ identifierTypeId });
}
