import isEmpty from 'lodash/isEmpty';

import { makeQueryFunction } from '@folio/stripes/smart-components';

import {
  getAdvancedSearchTemplate,
  getDefaultQindex,
  getIsbnIssnTemplate,
  getQueryTemplate,
  getTemplateForSelectedFromBrowseRecord
} from '../utils';
import {
  CQL_FIND_ALL,
  DEFAULT_SORT,
  queryIndexes,
  segments,
} from '../constants';
import { filterConfig } from '../filterConfig';

// For the inventory app, query params are taken from `queryParams`, and for the plugin - from `props.resources.query`.
export const buildSearchQuery = (applyDefaultStaffSuppressFilter) => (queryParams, pathComponents, resourceData, logger, props) => {
  const segment = queryParams.segment || props.segment || segments.instances;
  const { indexes, sortMap, filters } = filterConfig[segment];
  const query = { ...resourceData.query };
  const defaultQindex = getDefaultQindex(segment);
  const queryIndex = (!isEmpty(queryParams) && (queryParams.qindex || defaultQindex))
    || props?.resources?.query?.qindex || defaultQindex;
  const queryValue = queryParams?.query || props?.resources?.query?.query || '';
  let queryTemplate = getQueryTemplate(queryIndex, indexes);

  const template = getTemplateForSelectedFromBrowseRecord(queryParams, queryIndex, queryValue);

  if (template) {
    queryTemplate = template;
  }

  if (queryIndex === queryIndexes.ADVANCED_SEARCH) {
    queryTemplate = getAdvancedSearchTemplate(queryValue);
  }

  if ([queryIndexes.ISBN, queryIndexes.ISSN].includes(queryIndex)) {
    // eslint-disable-next-line camelcase
    const identifierTypes = resourceData?.identifier_types?.records ?? [];
    queryTemplate = getIsbnIssnTemplate(queryTemplate, identifierTypes, queryIndex);
  }

  if (queryIndex === queryIndexes.QUERY_SEARCH && queryValue.match('sortby')) {
    query.sort = '';
  } else if (query.sort && query.sort === 'relevance') {
    query.sort = '';
  } else if (!query.sort) {
    // Default sort for filtering/searching instances/holdings/items should be by title (UIIN-1046)
    query.sort = DEFAULT_SORT;
  }

  applyDefaultStaffSuppressFilter(query, props.stripes);

  resourceData.query = {
    ...query,
    qindex: '',
  };

  // makeQueryFunction escapes quote and backslash characters by default,
  // but when submitting a raw CQL query (i.e. when queryIndex === 'querySearch')
  // we assume the user knows what they are doing and wants to run the CQL as-is.
  return makeQueryFunction(
    CQL_FIND_ALL,
    queryTemplate,
    sortMap,
    filters,
    2,
    null,
    queryIndex !== queryIndexes.QUERY_SEARCH,
  )(queryParams, pathComponents, resourceData, logger, props);
};
