import omit from 'lodash/omit';

import { makeQueryFunction } from '@folio/stripes/smart-components';
import { buildFilterQuery } from '@folio/stripes-acq-components';

import {
  browseCallNumberOptions,
  CQL_FIND_ALL,
  DEFAULT_FILTERS_NUMBER,
  FACETS_TO_REQUEST,
  queryIndexes,
} from '../../constants';

import {
  getAdvancedSearchTemplate,
  getDefaultQindex,
  getQueryTemplate,
  getTemplateForSelectedFromBrowseRecord,
} from '../../utils';

function buildQuery(queryParams, pathComponents, resourceData, logger, filterConfig) {
  const qindex = queryParams?.qindex || getDefaultQindex(queryParams.segment);
  const queryValue = queryParams?.query ?? '';
  const { indexes, filters } = filterConfig;
  let queryTemplate = getQueryTemplate(qindex, indexes);

  const template = getTemplateForSelectedFromBrowseRecord(queryParams, qindex, queryValue);

  if (template) {
    queryTemplate = template;
  }

  if (qindex === queryIndexes.ADVANCED_SEARCH) {
    queryTemplate = getAdvancedSearchTemplate(queryValue);
  }

  // reset qindex otherwise makeQueryFunction does not use queryTemplate
  // https://github.com/folio-org/stripes-smart-components/blob/e918a620ad2ac2c5b06ce121cd0e061a03bcfdf6/lib/SearchAndSort/makeQueryFunction.js#L46
  // https://issues.folio.org/browse/UIIN-2189
  // Add `filters` field with default value, since Browse lookup doesn't have it.
  resourceData.query = {
    ...resourceData.query,
    filters: resourceData.query.filters || '',
    qindex: '',
  };

  const cql = makeQueryFunction(
    CQL_FIND_ALL,
    queryTemplate,
    {},
    filters,
    2,
    null,
    false,
  )(queryParams, pathComponents, resourceData, logger);

  return cql === undefined
    ? CQL_FIND_ALL
    : cql;
}

export const getCqlQuery = (isBrowseLookup, query, filterConfig) => {
  const { qindex } = query;

  if (isBrowseLookup) {
    const normalizedFilters = {
      ...Object.entries(query).reduce((acc, [key, value]) => ({
        ...acc,
        [FACETS_TO_REQUEST[key] || key]: value,
      }), {}),
      query: query.query || undefined,
    };

    const otherFilters = omit(normalizedFilters, 'query', 'qindex');
    const hasSelectedFacetOption = Object.values(otherFilters).some(Boolean);

    let queryForBrowseFacets = '';

    const isTypedCallNumber = Object.values(browseCallNumberOptions).includes(qindex)
      && qindex !== browseCallNumberOptions.CALL_NUMBERS;
    // We shouldn't count "Instances" with "Holdings": 1) without "Items"
    // or 2) with "Items" with empty "Effective call number" field.
    const itemsEffectiveShelvingOrder = 'items.effectiveShelvingOrder="" NOT items.effectiveShelvingOrder==""';

    if (isTypedCallNumber) {
      queryForBrowseFacets = `callNumberType="${qindex}" and ${itemsEffectiveShelvingOrder}`;
    } else if (qindex === browseCallNumberOptions.CALL_NUMBERS) {
      queryForBrowseFacets = itemsEffectiveShelvingOrder;
    } else if (!hasSelectedFacetOption) {
      queryForBrowseFacets = 'cql.allRecords=1';
    }

    return buildFilterQuery(
      {
        query: queryForBrowseFacets,
        qindex: normalizedFilters.qindex,
        ...otherFilters,
      },
      _query => _query,
      undefined,
      false,
    );
  }

  return buildQuery(query, {}, { query }, { log: () => null }, filterConfig) || '';
};

export const getFacetCql = name => ({
  all: FACETS_TO_REQUEST[name], // fetch all options of facet
  default: `${FACETS_TO_REQUEST[name]}:${DEFAULT_FILTERS_NUMBER}`, // fetch 6 options of facet
});

export const isFacet = (name) => !name.match(/createdDate|updatedDate/i);