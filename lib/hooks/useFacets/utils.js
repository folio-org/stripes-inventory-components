import omit from 'lodash/omit';

import { makeQueryFunction } from '@folio/stripes/smart-components';
import { buildFilterQuery } from '@folio/stripes-acq-components';

import {
  browseCallNumberOptions,
  browseCallNumberIndexToId,
  browseClassificationIndexToId,
  browseClassificationOptions,
  CQL_FIND_ALL,
  FACETS_TO_REQUEST,
  queryIndexes,
  segments,
} from '../../constants';

import {
  getAdvancedSearchTemplate,
  getDefaultQindex,
  getQueryTemplate,
  getTemplateForSelectedFromBrowseRecord,
} from '../../utils';
import { filterConfig } from '../../filterConfig';

function buildQuery(queryParams, pathComponents, resourceData, logger) {
  const segment = queryParams.segment || segments.instances;
  const qindex = queryParams?.qindex || getDefaultQindex(segment);
  const queryValue = queryParams?.query ?? '';
  const { indexes, filters } = filterConfig[segment];
  let queryTemplate = getQueryTemplate(qindex, indexes);

  const template = getTemplateForSelectedFromBrowseRecord(queryParams, qindex, queryValue);

  if (template) {
    queryTemplate = template;
  }

  if (qindex === queryIndexes.ADVANCED_SEARCH) {
    queryTemplate = getAdvancedSearchTemplate(queryValue);
  }

  // When switching between Browse and Search some facet data can take a while to update because of async store updates.
  // In such cases we shouldn't make requests and we can prevent it by checking for undefined query templates.
  if (!queryTemplate) {
    return null;
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

  return cql;
}

export const getCqlQuery = (isBrowseLookup, query, data, segment) => {
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

    const isCallNumber = Object.values(browseCallNumberOptions).includes(qindex);

    if (isCallNumber) {
      queryForBrowseFacets = `callNumberTypeId=="${browseCallNumberIndexToId[qindex]}"`;
    } else if (!hasSelectedFacetOption) {
      queryForBrowseFacets = 'cql.allRecords=1';
    }

    const isClassificationBrowse = Object.values(browseClassificationOptions).includes(qindex);
    const classificationBrowseConfigId = browseClassificationIndexToId[qindex];
    const classificationBrowseTypes = data.classificationBrowseConfig
      .find(config => config.id === classificationBrowseConfigId)?.typeIds;

    return buildFilterQuery(
      {
        query: queryForBrowseFacets,
        qindex: normalizedFilters.qindex,
        ...otherFilters,
        ...(isClassificationBrowse && classificationBrowseTypes?.length && {
          typeId: classificationBrowseTypes,
        }),
      },
      _query => _query,
      undefined,
      false,
    );
  }

  return buildQuery({ ...query, segment }, {}, { query }, { log: () => null }) || '';
};

