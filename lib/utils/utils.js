import template from 'lodash/template';
import noop from 'lodash/noop';

import {
  advancedSearchQueryToRows,
  REQUEST_URL_LIMIT,
} from '@folio/stripes/smart-components';
import { escapeCqlValue } from '@folio/stripes/util';

import queryString from 'query-string';
import {
  queryIndexes,
  fieldSearchConfigurations,
  segments,
  FAILED_TO_FETCH_ERROR,
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
  const escapedValue = escapeCqlValue(queryValue);

  return advancedSearchQueryToRows(escapedValue).reduce((acc, row) => {
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

export const getRequestUrlLength = (pathname, host, params) => {
  const url = new URL(pathname, host);
  const searchParams = queryString.stringify(params);

  url.search = searchParams.toString();

  return url.toString().length;
};

export const processSearchErrors = ({ error, callout, intl, pathname, host, params, setIsRequestUrlExceededLimit = noop }) => {
  if (error.message === FAILED_TO_FETCH_ERROR && getRequestUrlLength(pathname, host, params) > REQUEST_URL_LIMIT) {
    const message = intl.formatMessage({ id: 'stripes-smart-components.error.requestUrlLimit' }, { limit: REQUEST_URL_LIMIT });
    const toasts = [...document.querySelectorAll('[id^="callout-"]')];
    const hasAlreadyShown = toasts.some(toast => toast.textContent === message);

    setIsRequestUrlExceededLimit(true);

    // prevent displaying two identical error messages when both records and facets return it
    if (hasAlreadyShown) return;

    callout.sendCallout({
      type: 'error',
      message,
    });
  }
};

export const handleSegmentChange = (nextSegment, segment, onChange) => {
  if (nextSegment === segment) return;

  onChange(nextSegment);
};
