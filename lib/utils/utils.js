import moment from 'moment';

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

export const buildDateRangeQuery = name => values => {
  const DATE_TIME_RANGE_FILTER_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
  const [startDateString, endDateString] = values[0]?.split(':') || [];

  if (!startDateString || !endDateString) return '';

  const start = moment(startDateString).startOf('day').utc().format(DATE_TIME_RANGE_FILTER_FORMAT);
  const end = moment(endDateString).endOf('day').utc().format(DATE_TIME_RANGE_FILTER_FORMAT);

  return `${name}>="${start}" and ${name}<="${end}"`;
};

export const getDefaultQindex = (segment) => {
  const defaultQindex = {
    [segments.instances]: queryIndexes.INSTANCE_KEYWORD,
    [segments.holdings]: queryIndexes.HOLDINGS_KEYWORD,
    [segments.items]: queryIndexes.ITEMS_KEYWORD,
  };

  return defaultQindex[segment] || queryIndexes.INSTANCE_KEYWORD;
};

export const isConsortiaEnv = stripes => stripes.hasInterface('consortia');
