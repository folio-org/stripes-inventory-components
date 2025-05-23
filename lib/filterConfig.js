import { dayjs } from '@folio/stripes-components';

import {
  FACETS,
  FACETS_CQL,
  queryIndexes,
  segments,
} from './constants';

export const buildDateIntervalFilterQuery = name => values => {
  const DATE_TIME_RANGE_FILTER_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
  const [startDateString, endDateString] = values[0]?.split(':') || [];

  if (!startDateString && !endDateString) {
    return '';
  }

  const start = dayjs(startDateString).startOf('day').utc().format(DATE_TIME_RANGE_FILTER_FORMAT);
  const end = dayjs(endDateString).endOf('day').utc().format(DATE_TIME_RANGE_FILTER_FORMAT);

  const queryParts = [startDateString ? `${name}>="${start}"` : null, endDateString ? `${name}<="${end}"` : null];

  return queryParts.filter(el => !!el).join(' and ');
};

export const buildDateRangeFilterQuery = name => values => {
  const [startDateString, endDateString] = values[0].split(':');

  if (!startDateString && !endDateString) {
    return '';
  }

  return [
    startDateString && `${name}>=${startDateString}`,
    endDateString && `${name}<=${endDateString}`
  ].filter(q => q).join(' and ');
};

export const filterConfigMap = {
  [FACETS.SHARED]: { name: FACETS.SHARED, cql: FACETS_CQL.SHARED, values: [] },
  [FACETS.HELD_BY]: { name: FACETS.HELD_BY, cql: FACETS_CQL.HELD_BY, values: [] },
  [FACETS.EFFECTIVE_LOCATION]: { name: FACETS.EFFECTIVE_LOCATION, cql: FACETS_CQL.EFFECTIVE_LOCATION, values: [] },
  [FACETS.LANGUAGE]: { name: FACETS.LANGUAGE, cql: FACETS_CQL.LANGUAGES, values: [] },
  [FACETS.FORMAT]: { name: FACETS.FORMAT, cql: FACETS_CQL.INSTANCE_FORMAT, values: [] },
  [FACETS.RESOURCE]: { name: FACETS.RESOURCE, cql: FACETS_CQL.INSTANCE_TYPE, values: [] },
  [FACETS.MODE]: { name: FACETS.MODE, cql: FACETS_CQL.MODE_OF_ISSUANCE, values: [] },
  [FACETS.NATURE_OF_CONTENT]: { name: FACETS.NATURE_OF_CONTENT, cql: FACETS_CQL.NATURE_OF_CONTENT, values: [] },
  [FACETS.STAFF_SUPPRESS]:   { name: FACETS_CQL.STAFF_SUPPRESS, cql: FACETS_CQL.STAFF_SUPPRESS, values: [] },
  [FACETS.INSTANCES_DISCOVERY_SUPPRESS]: { name: FACETS.INSTANCES_DISCOVERY_SUPPRESS, cql: FACETS_CQL.INSTANCES_DISCOVERY_SUPPRESS, values: [] },
  [FACETS.DATE_RANGE]: {
    name: FACETS.DATE_RANGE,
    cql: FACETS_CQL.DATE_RANGE,
    values: [],
    parse: buildDateRangeFilterQuery(FACETS_CQL.DATE_RANGE),
  },
  [FACETS.CREATED_DATE]: {
    name: FACETS.CREATED_DATE,
    cql: FACETS_CQL.CREATED_DATE,
    values: [],
    parse: buildDateIntervalFilterQuery(FACETS_CQL.CREATED_DATE),
  },
  [FACETS.UPDATED_DATE]: {
    name: FACETS.UPDATED_DATE,
    cql: FACETS_CQL.UPDATED_DATE,
    values: [],
    parse: buildDateIntervalFilterQuery(FACETS_CQL.UPDATED_DATE),
  },
  [FACETS.STATUS]: { name: FACETS.STATUS, cql: FACETS_CQL.STATUS, operator: '==', values: [] },
  [FACETS.SOURCE]: { name: FACETS.SOURCE, cql: FACETS_CQL.SOURCE, operator: '==', values: [] },
  [FACETS.STATISTICAL_CODE_IDS]: { name: FACETS.STATISTICAL_CODE_IDS, cql: FACETS_CQL.STATISTICAL_CODE_IDS, values: [] },
  [FACETS.INSTANCES_TAGS]: { name: FACETS.INSTANCES_TAGS, cql: FACETS_CQL.INSTANCES_TAGS, values: [] },
  [FACETS.NAME_TYPE]: { name: FACETS.NAME_TYPE, cql: FACETS_CQL.NAME_TYPE, values: [] },
  [FACETS.SEARCH_CONTRIBUTORS]: { name: FACETS.SEARCH_CONTRIBUTORS, cql: FACETS_CQL.SEARCH_CONTRIBUTORS, values: [] },
  [FACETS.SEARCH_SUBJECT_SOURCE]: { name: FACETS.SEARCH_SUBJECT_SOURCE, cql: FACETS_CQL.SEARCH_SUBJECT_SOURCE, values: [] },
  [FACETS.SEARCH_SUBJECT_TYPE]: { name: FACETS.SEARCH_SUBJECT_TYPE, cql: FACETS_CQL.SEARCH_SUBJECT_TYPE, values: [] },
  [FACETS.AUTHORITY_ID]: { name: FACETS.AUTHORITY_ID, cql: FACETS_CQL.AUTHORITY_ID, values: [] },
  [FACETS.HOLDINGS_PERMANENT_LOCATION]: { name: FACETS.HOLDINGS_PERMANENT_LOCATION, cql: FACETS_CQL.HOLDINGS_PERMANENT_LOCATION, values: [] },
  [FACETS.HOLDINGS_TYPE]: { name: FACETS.HOLDINGS_TYPE, cql: FACETS_CQL.HOLDINGS_TYPE, values: [] },
  [FACETS.HOLDINGS_DISCOVERY_SUPPRESS]: { name: FACETS.HOLDINGS_DISCOVERY_SUPPRESS, cql: FACETS_CQL.HOLDINGS_DISCOVERY_SUPPRESS, values: [] },
  [FACETS.HOLDINGS_TAGS]: { name: FACETS.HOLDINGS_TAGS, cql: FACETS_CQL.HOLDINGS_TAGS, values: [] },
  [FACETS.HOLDINGS_STATISTICAL_CODE_IDS]: { name: FACETS.HOLDINGS_STATISTICAL_CODE_IDS, cql: FACETS_CQL.HOLDINGS_STATISTICAL_CODE_IDS, values: [] },
  [FACETS.HOLDINGS_CREATED_DATE]: {
    name: FACETS.HOLDINGS_CREATED_DATE,
    cql: FACETS_CQL.HOLDINGS_CREATED_DATE,
    values: [],
    parse: buildDateIntervalFilterQuery(FACETS_CQL.HOLDINGS_CREATED_DATE),
  },
  [FACETS.HOLDINGS_UPDATED_DATE]: {
    name: FACETS.HOLDINGS_UPDATED_DATE,
    cql: FACETS_CQL.HOLDINGS_UPDATED_DATE,
    values: [],
    parse: buildDateIntervalFilterQuery(FACETS_CQL.HOLDINGS_UPDATED_DATE),
  },
  [FACETS.HOLDINGS_SOURCE]: { name: FACETS.HOLDINGS_SOURCE, cql: FACETS_CQL.HOLDINGS_SOURCE, values: [] },
  [FACETS.MATERIAL_TYPE]: { name: FACETS.MATERIAL_TYPE, cql: FACETS_CQL.MATERIAL_TYPES, values: [] },
  [FACETS.ITEM_STATUS]: { name: FACETS.ITEM_STATUS, cql: FACETS_CQL.ITEMS_STATUSES, operator: '==', values: [] },
  [FACETS.ITEMS_DISCOVERY_SUPPRESS]: { name: FACETS.ITEMS_DISCOVERY_SUPPRESS, cql: FACETS_CQL.ITEMS_DISCOVERY_SUPPRESS, values: [] },
  [FACETS.ITEMS_STATISTICAL_CODE_IDS]: { name: FACETS.ITEMS_STATISTICAL_CODE_IDS, cql: FACETS_CQL.ITEMS_STATISTICAL_CODE_IDS, values: [] },
  [FACETS.ITEMS_CREATED_DATE]: {
    name: FACETS.ITEMS_CREATED_DATE,
    cql: FACETS_CQL.ITEMS_CREATED_DATE,
    values: [],
    parse: buildDateIntervalFilterQuery(FACETS_CQL.ITEMS_CREATED_DATE),
  },
  [FACETS.ITEMS_UPDATED_DATE]: {
    name: FACETS.ITEMS_UPDATED_DATE,
    cql: FACETS_CQL.ITEMS_UPDATED_DATE,
    values: [],
    parse: buildDateIntervalFilterQuery(FACETS_CQL.ITEMS_UPDATED_DATE),
  },
  [FACETS.ITEMS_TAGS]: { name: FACETS.ITEMS_TAGS, cql: FACETS_CQL.ITEMS_TAGS, values: [] },
};

export const advancedSearchIndexes = {
  [segments.instances]: [
    { label: 'stripes-inventory-components.search.advanced.keyword', value: 'keyword' },
    { label: 'stripes-inventory-components.search.contributor', value: 'contributor' },
    { label: 'stripes-inventory-components.search.title', value: 'title' },
    { label: 'stripes-inventory-components.search.identifierAll', value: 'identifier' },
    { label: 'stripes-inventory-components.search.normalizedClassificationNumber', value: 'normalizedClassificationNumber' },
    { label: 'stripes-inventory-components.search.isbn', value: 'isbn' },
    { label: 'stripes-inventory-components.search.issn', value: 'issn' },
    { label: 'stripes-inventory-components.search.lccn', value: 'lccn' },
    { label: 'stripes-inventory-components.search.oclc', value: 'oclc' },
    { label: 'stripes-inventory-components.search.instanceNotes', value: 'instanceNotes' },
    { label: 'stripes-inventory-components.search.instanceAdministrativeNotes', value: 'instanceAdministrativeNotes' },
    { label: 'stripes-inventory-components.search.placeOfPublication', value: 'placeOfPublication' },
    { label: 'stripes-inventory-components.search.subject', value: 'subject' },
    { label: 'stripes-inventory-components.search.instanceHrid', value: 'hrid' },
    { label: 'stripes-inventory-components.search.instanceId', value: 'id' },
    { label: 'stripes-inventory-components.search.authorityId', value: 'authorityId' },
    { label: 'stripes-inventory-components.search.allFields', value: 'allFields' },
  ],
  [segments.holdings]: [
    { label: 'stripes-inventory-components.search.advanced.keyword', value: 'keyword' },
    { label: 'stripes-inventory-components.search.isbn', value: 'isbn' },
    { label: 'stripes-inventory-components.search.issn', value: 'issn' },
    { label: 'stripes-inventory-components.search.callNumberEyeReadable', value: 'holdingsFullCallNumbers' },
    { label: 'stripes-inventory-components.search.callNumberNormalized', value: 'holdingsNormalizedCallNumbers' },
    { label: 'stripes-inventory-components.search.holdingsNotes', value: 'holdingsNotes' },
    { label: 'stripes-inventory-components.search.holdingsAdministrativeNotes', value: 'holdingsAdministrativeNotes' },
    { label: 'stripes-inventory-components.search.holdingsHrid', value: 'holdingsHrid' },
    { label: 'stripes-inventory-components.search.holdingsUuid', value: 'hid' },
    { label: 'stripes-inventory-components.search.allFields', value: 'allFields' },
  ],
  [segments.items]: [
    { label: 'stripes-inventory-components.search.advanced.keyword', value: 'keyword' },
    { label: 'stripes-inventory-components.search.barcode', value: 'barcode' },
    { label: 'stripes-inventory-components.search.isbn', value: 'isbn' },
    { label: 'stripes-inventory-components.search.issn', value: 'issn' },
    { label: 'stripes-inventory-components.search.itemEffectiveCallNumberEyeReadable', value: 'itemFullCallNumbers' },
    { label: 'stripes-inventory-components.search.itemEffectiveCallNumberNormalized', value: 'itemNormalizedCallNumbers' },
    { label: 'stripes-inventory-components.search.itemNotes', value: 'itemNotes' },
    { label: 'stripes-inventory-components.search.itemAdministrativeNotes', value: 'itemAdministrativeNotes' },
    { label: 'stripes-inventory-components.search.itemCirculationNotes', value: 'itemCirculationNotes' },
    { label: 'stripes-inventory-components.search.itemHrid', value: 'itemHrid' },
    { label: 'stripes-inventory-components.search.itemUuid', value: 'iid' },
    { label: 'stripes-inventory-components.search.allFields', value: 'allFields' },
  ],
};

export const queryIndexesMap = {
  [queryIndexes.INSTANCE_KEYWORD]: { label: 'stripes-inventory-components.search.keyword', value: queryIndexes.INSTANCE_KEYWORD, queryTemplate: 'keyword all "%{query.query}" or isbn="%{query.query}" or hrid=="%{query.query}" or id=="%{query.query}"' },
  [queryIndexes.CONTRIBUTOR]: { label: 'stripes-inventory-components.search.contributor', value: queryIndexes.CONTRIBUTOR, queryTemplate: 'contributors.name="%{query.query}"' },
  [queryIndexes.TITLE]: { label: 'stripes-inventory-components.search.title', value: queryIndexes.TITLE, queryTemplate: 'title all "%{query.query}"' },
  [queryIndexes.IDENTIFIER]: { label: 'stripes-inventory-components.search.identifierAll', value: queryIndexes.IDENTIFIER, queryTemplate: 'identifiers.value="%{query.query}" or isbn="%{query.query}"' },
  [queryIndexes.NORMALIZED_CLASSIFICATION_NUMBER]: { label: 'stripes-inventory-components.search.normalizedClassificationNumber', value: queryIndexes.NORMALIZED_CLASSIFICATION_NUMBER, queryTemplate: 'normalizedClassificationNumber=="%{query.query}"' },
  [queryIndexes.ISBN]: { label: 'stripes-inventory-components.search.isbn', value: queryIndexes.ISBN, queryTemplate: 'isbn="%{query.query}"' },
  [queryIndexes.ISSN]: { label: 'stripes-inventory-components.search.issn', value: queryIndexes.ISSN, queryTemplate: 'issn="%{query.query}"' },
  [queryIndexes.LCCN]: { label: 'stripes-inventory-components.search.lccn', value: queryIndexes.LCCN, queryTemplate: 'lccn="%{query.query}"' },
  [queryIndexes.OCLC]: { label: 'stripes-inventory-components.search.oclc', value: queryIndexes.OCLC, queryTemplate: 'oclc="%{query.query}"' },
  [queryIndexes.INSTANCE_NOTES]: { label: 'stripes-inventory-components.search.instanceNotes', value: queryIndexes.INSTANCE_NOTES, queryTemplate: 'notes.note all "%{query.query}" or administrativeNotes all "%{query.query}"' },
  [queryIndexes.INSTANCE_ADMINISTRATIVE_NOTES]: { label: 'stripes-inventory-components.search.instanceAdministrativeNotes', value: queryIndexes.INSTANCE_ADMINISTRATIVE_NOTES, queryTemplate: 'administrativeNotes all "%{query.query}"' },
  [queryIndexes.PLACE_OF_PUBLICATION]: { label: 'stripes-inventory-components.search.placeOfPublication', value: queryIndexes.PLACE_OF_PUBLICATION, queryTemplate: 'publication.place all "%{query.query}"' },
  [queryIndexes.SUBJECT]: { label: 'stripes-inventory-components.search.subject', value: queryIndexes.SUBJECT, queryTemplate: 'subjects.value==/string "%{query.query}"' },
  [queryIndexes.INSTANCE_HRID]: { label: 'stripes-inventory-components.search.instanceHrid', value: queryIndexes.INSTANCE_HRID, queryTemplate: 'hrid=="%{query.query}"' },
  [queryIndexes.INSTANCE_ID]: { label: 'stripes-inventory-components.search.instanceId', value: queryIndexes.INSTANCE_ID, queryTemplate: 'id="%{query.query}"' },
  [queryIndexes.AUTHORITY_ID]: { label: 'stripes-inventory-components.search.authorityId', value: queryIndexes.AUTHORITY_ID, queryTemplate: 'authorityId == %{query.query}' },
  [queryIndexes.ALL_FIELDS]: { label: 'stripes-inventory-components.search.allFields', value: queryIndexes.ALL_FIELDS, queryTemplate: 'cql.all="%{query.query}"' },
  [queryIndexes.QUERY_SEARCH]: { label: 'stripes-inventory-components.search.querySearch', value: queryIndexes.QUERY_SEARCH, queryTemplate: '%{query.query}' },
  [queryIndexes.ADVANCED_SEARCH]: { label: 'stripes-inventory-components.search.advancedSearch', value: queryIndexes.ADVANCED_SEARCH, queryTemplate: '%{query.query}' },
  [queryIndexes.HOLDINGS_KEYWORD]: { label: 'stripes-inventory-components.search.keyword', value: queryIndexes.HOLDINGS_KEYWORD, queryTemplate: 'keyword all "%{query.query}" or isbn="%{query.query}" or holdings.hrid=="%{query.query}" or holdings.id=="%{query.query}"' },
  [queryIndexes.HOLDINGS_FULL_CALL_NUMBERS]: { label: 'stripes-inventory-components.search.callNumberEyeReadable', value: queryIndexes.HOLDINGS_FULL_CALL_NUMBERS, queryTemplate: 'holdingsFullCallNumbers="%{query.query}"' },
  [queryIndexes.CALL_NUMBER_NORMALIZED]: { label: 'stripes-inventory-components.search.callNumberNormalized', value: queryIndexes.CALL_NUMBER_NORMALIZED, queryTemplate: 'holdingsNormalizedCallNumbers="%{query.query}"' },
  [queryIndexes.HOLDINGS_NOTES]: { label: 'stripes-inventory-components.search.holdingsNotes', value: queryIndexes.HOLDINGS_NOTES, queryTemplate: 'holdings.notes.note all "%{query.query}" or holdings.administrativeNotes all "%{query.query}"' },
  [queryIndexes.HOLDINGS_ADMINISTRATIVE_NOTES]: { label: 'stripes-inventory-components.search.holdingsAdministrativeNotes', value: queryIndexes.HOLDINGS_ADMINISTRATIVE_NOTES, queryTemplate: 'holdings.administrativeNotes all "%{query.query}"' },
  [queryIndexes.HOLDINGS_HRID]: { label: 'stripes-inventory-components.search.holdingsHrid', value: queryIndexes.HOLDINGS_HRID, queryTemplate: 'holdings.hrid=="%{query.query}"' },
  [queryIndexes.HOLDINGS_ID]: { label: 'stripes-inventory-components.search.holdingsUuid', value: queryIndexes.HOLDINGS_ID, queryTemplate: 'holdings.id=="%{query.query}"' },
  [queryIndexes.ITEMS_BARCODE]: { label: 'stripes-inventory-components.search.barcode', value: queryIndexes.ITEMS_BARCODE, queryTemplate: 'items.barcode=="%{query.query}"' },
  [queryIndexes.ITEMS_KEYWORD]: { label: 'stripes-inventory-components.search.item.keyword', value: queryIndexes.ITEMS_KEYWORD, queryTemplate: 'keyword all "%{query.query}" or isbn="%{query.query}" or item.hrid=="%{query.query}" or item.id=="%{query.query}" or items.barcode=="%{query.query}"' },
  [queryIndexes.ITEM_FULL_CALL_NUMBERS]: { label: 'stripes-inventory-components.search.itemEffectiveCallNumberEyeReadable', value: queryIndexes.ITEM_FULL_CALL_NUMBERS, queryTemplate: 'itemFullCallNumbers="%{query.query}"' },
  [queryIndexes.ITEM_NORMALIZED_CALL_NUMBERS]: { label: 'stripes-inventory-components.search.itemEffectiveCallNumberNormalized', value: queryIndexes.ITEM_NORMALIZED_CALL_NUMBERS, queryTemplate: 'itemNormalizedCallNumbers="%{query.query}"' },
  [queryIndexes.ITEM_NOTES]: { label: 'stripes-inventory-components.search.itemNotes', value: queryIndexes.ITEM_NOTES, queryTemplate: 'item.notes.note all "%{query.query}" or item.administrativeNotes all "%{query.query}"' },
  [queryIndexes.ITEM_ADMINISTRATIVE_NOTES]: { label: 'stripes-inventory-components.search.itemAdministrativeNotes', value: queryIndexes.ITEM_ADMINISTRATIVE_NOTES, queryTemplate: 'item.administrativeNotes all "%{query.query}"' },
  [queryIndexes.ITEM_CIRCULATION_NOTES]: { label: 'stripes-inventory-components.search.itemCirculationNotes', value: queryIndexes.ITEM_CIRCULATION_NOTES, queryTemplate: 'item.circulationNotes.note all "%{query.query}"' },
  [queryIndexes.ITEM_HRID]: { label: 'stripes-inventory-components.search.itemHrid', value: queryIndexes.ITEM_HRID, queryTemplate: 'items.hrid=="%{query.query}"' },
  [queryIndexes.ITEM_ID]: { label: 'stripes-inventory-components.search.itemUuid', value: queryIndexes.ITEM_ID, queryTemplate: 'item.id=="%{query.query}"' },
};

export const instanceSortMap = {
  Title: 'title',
  publishers: 'publication',
  Contributors: 'contributors',
};

export const holdingSortMap = {};

export const itemSortMap = {
  Title: 'title',
  publishers: 'publication',
  Contributors: 'contributors',
};

export const instanceIndexes = [
  queryIndexesMap[queryIndexes.INSTANCE_KEYWORD],
  queryIndexesMap[queryIndexes.CONTRIBUTOR],
  queryIndexesMap[queryIndexes.TITLE],
  queryIndexesMap[queryIndexes.IDENTIFIER],
  queryIndexesMap[queryIndexes.NORMALIZED_CLASSIFICATION_NUMBER],
  queryIndexesMap[queryIndexes.ISBN],
  queryIndexesMap[queryIndexes.ISSN],
  queryIndexesMap[queryIndexes.LCCN],
  queryIndexesMap[queryIndexes.OCLC],
  queryIndexesMap[queryIndexes.INSTANCE_NOTES],
  queryIndexesMap[queryIndexes.INSTANCE_ADMINISTRATIVE_NOTES],
  queryIndexesMap[queryIndexes.PLACE_OF_PUBLICATION],
  queryIndexesMap[queryIndexes.SUBJECT],
  queryIndexesMap[queryIndexes.INSTANCE_HRID],
  queryIndexesMap[queryIndexes.INSTANCE_ID],
  queryIndexesMap[queryIndexes.AUTHORITY_ID],
  queryIndexesMap[queryIndexes.ALL_FIELDS],
  queryIndexesMap[queryIndexes.QUERY_SEARCH],
  queryIndexesMap[queryIndexes.ADVANCED_SEARCH],
];

export const holdingIndexes = [
  queryIndexesMap[queryIndexes.HOLDINGS_KEYWORD],
  queryIndexesMap[queryIndexes.ISBN],
  queryIndexesMap[queryIndexes.ISSN],
  queryIndexesMap[queryIndexes.HOLDINGS_FULL_CALL_NUMBERS],
  queryIndexesMap[queryIndexes.CALL_NUMBER_NORMALIZED],
  queryIndexesMap[queryIndexes.HOLDINGS_NOTES],
  queryIndexesMap[queryIndexes.HOLDINGS_ADMINISTRATIVE_NOTES],
  queryIndexesMap[queryIndexes.HOLDINGS_HRID],
  queryIndexesMap[queryIndexes.HOLDINGS_ID],
  queryIndexesMap[queryIndexes.ALL_FIELDS],
  queryIndexesMap[queryIndexes.QUERY_SEARCH],
  queryIndexesMap[queryIndexes.ADVANCED_SEARCH],
];

export const itemIndexes = [
  queryIndexesMap[queryIndexes.ITEMS_KEYWORD],
  queryIndexesMap[queryIndexes.ITEMS_BARCODE],
  queryIndexesMap[queryIndexes.ISBN],
  queryIndexesMap[queryIndexes.ISSN],
  queryIndexesMap[queryIndexes.ITEM_FULL_CALL_NUMBERS],
  queryIndexesMap[queryIndexes.ITEM_NORMALIZED_CALL_NUMBERS],
  queryIndexesMap[queryIndexes.ITEM_NOTES],
  queryIndexesMap[queryIndexes.ITEM_ADMINISTRATIVE_NOTES],
  queryIndexesMap[queryIndexes.ITEM_CIRCULATION_NOTES],
  queryIndexesMap[queryIndexes.ITEM_HRID],
  queryIndexesMap[queryIndexes.ITEM_ID],
  queryIndexesMap[queryIndexes.ALL_FIELDS],
  queryIndexesMap[queryIndexes.QUERY_SEARCH],
  queryIndexesMap[queryIndexes.ADVANCED_SEARCH],
];

const filters = Object.values(filterConfigMap);

export const filterConfig = {
  [segments.instances]: {
    filters,
    indexes: instanceIndexes,
    sortMap: instanceSortMap,
  },
  [segments.holdings]: {
    filters,
    indexes: holdingIndexes,
    sortMap: holdingSortMap,
  },
  [segments.items]: {
    filters,
    indexes: itemIndexes,
    sortMap: itemSortMap,
  },
};
