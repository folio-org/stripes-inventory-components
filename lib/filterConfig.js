import { buildDateRangeQuery } from './utils';
import {
  FACETS,
  FACETS_CQL,
  queryIndexes,
  segments,
} from './constants';

export const filterConfigMap = {
  [FACETS.SHARED]: {
    name: FACETS.SHARED,
    cql: FACETS_CQL.SHARED,
    values: [],
  },
  [FACETS.HELD_BY]: {
    name: FACETS.HELD_BY,
    cql: FACETS_CQL.HELD_BY,
    values: [],
  },
  [FACETS.EFFECTIVE_LOCATION]: {
    name: FACETS.EFFECTIVE_LOCATION,
    cql: FACETS_CQL.EFFECTIVE_LOCATION,
    values: [],
  },
  [FACETS.LANGUAGE]: {
    name: FACETS.LANGUAGE,
    cql: FACETS_CQL.LANGUAGES,
    values: [],
  },
  [FACETS.FORMAT]: {
    name: FACETS.FORMAT,
    cql: FACETS_CQL.INSTANCE_FORMAT,
    values: [],
  },
  [FACETS.RESOURCE]: {
    name: FACETS.RESOURCE,
    cql: FACETS_CQL.INSTANCE_TYPE,
    values: [],
  },
  [FACETS.MODE]: {
    name: FACETS.MODE,
    cql: FACETS_CQL.MODE_OF_ISSUANCE,
    values: [],
  },
  [FACETS.NATURE_OF_CONTENT]: {
    name: FACETS.NATURE_OF_CONTENT,
    cql: FACETS_CQL.NATURE_OF_CONTENT,
    values: [],
  },
  [FACETS_CQL.STAFF_SUPPRESS]:   {
    name: FACETS_CQL.STAFF_SUPPRESS,
    cql: FACETS_CQL.STAFF_SUPPRESS,
    values: [],
  },
  [FACETS.INSTANCES_DISCOVERY_SUPPRESS]: {
    name: FACETS.INSTANCES_DISCOVERY_SUPPRESS,
    cql: FACETS_CQL.INSTANCES_DISCOVERY_SUPPRESS,
    values: [],
  },
  [FACETS.CREATED_DATE]: {
    name: FACETS.CREATED_DATE,
    cql: FACETS_CQL.CREATED_DATE,
    values: [],
    parse: buildDateRangeQuery(FACETS_CQL.CREATED_DATE),
  },
  [FACETS.UPDATED_DATE]: {
    name: FACETS.UPDATED_DATE,
    cql: FACETS_CQL.UPDATED_DATE,
    values: [],
    parse: buildDateRangeQuery(FACETS_CQL.UPDATED_DATE),
  },
  [FACETS.STATUS]: {
    name: FACETS.STATUS,
    cql: FACETS_CQL.STATUS,
    operator: '==',
    values: [],
  },
  [FACETS.SOURCE]: {
    name: FACETS.SOURCE,
    cql: FACETS_CQL.SOURCE,
    operator: '==',
    values: [],
  },
  [FACETS.STATISTICAL_CODE_IDS]: {
    name: FACETS.STATISTICAL_CODE_IDS,
    cql: FACETS_CQL.STATISTICAL_CODE_IDS,
    values: [],
  },
  [FACETS.INSTANCES_TAGS]: {
    name: FACETS.INSTANCES_TAGS,
    cql: FACETS_CQL.INSTANCES_TAGS,
    values: [],
  },
  [FACETS.NAME_TYPE]: {
    name: FACETS.NAME_TYPE,
    cql: FACETS_CQL.NAME_TYPE,
    values: [],
  },
  [FACETS.SEARCH_CONTRIBUTORS]: {
    name: FACETS.SEARCH_CONTRIBUTORS,
    cql: FACETS_CQL.SEARCH_CONTRIBUTORS,
    values: [],
  },
  [FACETS.AUTHORITY_ID]: {
    name: FACETS.AUTHORITY_ID,
    cql: FACETS_CQL.AUTHORITY_ID,
    values: [],
  },
  [FACETS.HOLDINGS_PERMANENT_LOCATION]: {
    name: FACETS.HOLDINGS_PERMANENT_LOCATION,
    cql: FACETS_CQL.HOLDINGS_PERMANENT_LOCATION,
    values: [],
  },
  [FACETS.HOLDINGS_TYPE]: {
    name: FACETS.HOLDINGS_TYPE,
    cql: FACETS_CQL.HOLDINGS_TYPE,
    values: [],
  },
  [FACETS.HOLDINGS_DISCOVERY_SUPPRESS]: {
    name: FACETS.HOLDINGS_DISCOVERY_SUPPRESS,
    cql: FACETS_CQL.HOLDINGS_DISCOVERY_SUPPRESS,
    values: [],
  },
  [FACETS.HOLDINGS_TAGS]: {
    name: FACETS.HOLDINGS_TAGS,
    cql: FACETS_CQL.HOLDINGS_TAGS,
    values: [],
  },
  [FACETS.HOLDINGS_STATISTICAL_CODE_IDS]: {
    name: FACETS.HOLDINGS_STATISTICAL_CODE_IDS,
    cql: FACETS_CQL.HOLDINGS_STATISTICAL_CODE_IDS,
    values: [],
  },
  [FACETS.HOLDINGS_CREATED_DATE]: {
    name: FACETS.HOLDINGS_CREATED_DATE,
    cql: FACETS_CQL.HOLDINGS_CREATED_DATE,
    values: [],
    parse: buildDateRangeQuery(FACETS_CQL.HOLDINGS_CREATED_DATE),
  },
  [FACETS.HOLDINGS_UPDATED_DATE]: {
    name: FACETS.HOLDINGS_UPDATED_DATE,
    cql: FACETS_CQL.HOLDINGS_UPDATED_DATE,
    values: [],
    parse: buildDateRangeQuery(FACETS_CQL.HOLDINGS_UPDATED_DATE),
  },
  [FACETS.HOLDINGS_SOURCE]: {
    name: FACETS.HOLDINGS_SOURCE,
    cql: FACETS_CQL.HOLDINGS_SOURCE,
    values: [],
  },
  [FACETS.MATERIAL_TYPE]: {
    name: FACETS.MATERIAL_TYPE,
    cql: FACETS_CQL.MATERIAL_TYPES,
    values: [],
  },
  [FACETS.ITEM_STATUS]: {
    name: FACETS.ITEM_STATUS,
    cql: FACETS_CQL.ITEMS_STATUSES,
    operator: '==',
    values: [],
  },
  [FACETS.ITEMS_DISCOVERY_SUPPRESS]: {
    name: FACETS.ITEMS_DISCOVERY_SUPPRESS,
    cql: FACETS_CQL.ITEMS_DISCOVERY_SUPPRESS,
    values: [],
  },
  [FACETS.ITEMS_STATISTICAL_CODE_IDS]: {
    name: FACETS.ITEMS_STATISTICAL_CODE_IDS,
    cql: FACETS_CQL.ITEMS_STATISTICAL_CODE_IDS,
    values: [],
  },
  [FACETS.ITEMS_CREATED_DATE]: {
    name: FACETS.ITEMS_CREATED_DATE,
    cql: FACETS_CQL.ITEMS_CREATED_DATE,
    values: [],
    parse: buildDateRangeQuery(FACETS_CQL.ITEMS_CREATED_DATE),
  },
  [FACETS.ITEMS_UPDATED_DATE]: {
    name: FACETS.ITEMS_UPDATED_DATE,
    cql: FACETS_CQL.ITEMS_UPDATED_DATE,
    values: [],
    parse: buildDateRangeQuery(FACETS_CQL.ITEMS_UPDATED_DATE),
  },
  [FACETS.ITEMS_TAGS]: {
    name: FACETS.ITEMS_TAGS,
    cql: FACETS_CQL.ITEMS_TAGS,
    values: [],
  },
};

export const advancedSearchIndexes = {
  [segments.instances]: [
    { label: 'ui-inventory.search.all', value: 'keyword' },
    { label: 'ui-inventory.contributor', value: 'contributor' },
    { label: 'ui-inventory.title', value: 'title' },
    { label: 'ui-inventory.identifierAll', value: 'identifier' },
    { label: 'ui-inventory.normalizedClassificationNumber', value: 'normalizedClassificationNumber' },
    { label: 'ui-inventory.isbn', value: 'isbn' },
    { label: 'ui-inventory.issn', value: 'issn' },
    { label: 'ui-inventory.lccn', value: 'lccn' },
    { label: 'ui-inventory.search.oclc', value: 'oclc' },
    { label: 'ui-inventory.search.instanceNotes', value: 'instanceNotes' },
    { label: 'ui-inventory.search.instanceAdministrativeNotes', value: 'instanceAdministrativeNotes' },
    { label: 'ui-inventory.subject', value: 'subject' },
    { label: 'ui-inventory.effectiveCallNumberShelving', value: 'callNumber' },
    { label: 'ui-inventory.instanceHrid', value: 'hrid' },
    { label: 'ui-inventory.instanceId', value: 'id' },
    { label: 'ui-inventory.authorityId', value: 'authorityId' },
    { label: 'ui-inventory.search.allFields', value: 'allFields' },
  ],
  [segments.holdings]: [
    { label: 'ui-inventory.search.all', value: 'keyword' },
    { label: 'ui-inventory.isbn', value: 'isbn' },
    { label: 'ui-inventory.issn', value: 'issn' },
    { label: 'ui-inventory.callNumberEyeReadable', value: 'holdingsFullCallNumbers' },
    { label: 'ui-inventory.callNumberNormalized', value: 'holdingsNormalizedCallNumbers' },
    { label: 'ui-inventory.search.holdingsNotes', value: 'holdingsNotes' },
    { label: 'ui-inventory.search.holdingsAdministrativeNotes', value: 'holdingsAdministrativeNotes' },
    { label: 'ui-inventory.holdingsHrid', value: 'holdingsHrid' },
    { label: 'ui-inventory.search.holdings.uuid', value: 'hid' },
    { label: 'ui-inventory.search.allFields', value: 'allFields' },
  ],
  [segments.items]: [
    { label: 'ui-inventory.search.all', value: 'keyword' },
    { label: 'ui-inventory.barcode', value: 'barcode' },
    { label: 'ui-inventory.isbn', value: 'isbn' },
    { label: 'ui-inventory.issn', value: 'issn' },
    { label: 'ui-inventory.itemEffectiveCallNumberEyeReadable', value: 'itemFullCallNumbers' },
    { label: 'ui-inventory.itemEffectiveCallNumberNormalized', value: 'itemNormalizedCallNumbers' },
    { label: 'ui-inventory.search.itemNotes', value: 'itemNotes' },
    { label: 'ui-inventory.search.itemAdministrativeNotes', value: 'itemAdministrativeNotes' },
    { label: 'ui-inventory.search.itemCirculationNotes', value: 'itemCirculationNotes' },
    { label: 'ui-inventory.itemHrid', value: 'itemHrid' },
    { label: 'ui-inventory.search.item.uuid', value: 'iid' },
    { label: 'ui-inventory.search.allFields', value: 'allFields' },
  ],
};

export const queryIndexesMap = {
  [queryIndexes.INSTANCE_KEYWORD]: { label: 'ui-inventory.search.all', value: queryIndexes.INSTANCE_KEYWORD, queryTemplate: 'keyword all "%{query.query}" or isbn="%{query.query}" or hrid=="%{query.query}" or id=="%{query.query}"' },
  [queryIndexes.CONTRIBUTOR]: { label: 'ui-inventory.contributor', value: queryIndexes.CONTRIBUTOR, queryTemplate: 'contributors.name="%{query.query}"' },
  [queryIndexes.TITLE]: { label: 'ui-inventory.title', value: queryIndexes.TITLE, queryTemplate: 'title all "%{query.query}"' },
  [queryIndexes.IDENTIFIER]: { label: 'ui-inventory.identifierAll', value: queryIndexes.IDENTIFIER, queryTemplate: 'identifiers.value="%{query.query}" or isbn="%{query.query}"' },
  [queryIndexes.NORMALIZED_CLASSIFICATION_NUMBER]: { label: 'ui-inventory.normalizedClassificationNumber', value: queryIndexes.NORMALIZED_CLASSIFICATION_NUMBER, queryTemplate: 'normalizedClassificationNumber=="%{query.query}"' },
  [queryIndexes.ISBN]: { label: 'ui-inventory.isbn', value: queryIndexes.ISBN, queryTemplate: 'isbn="%{query.query}"' },
  [queryIndexes.ISSN]: { label: 'ui-inventory.issn', value: queryIndexes.ISSN, queryTemplate: 'issn="%{query.query}"' },
  [queryIndexes.LCCN]: { label: 'ui-inventory.lccn', value: queryIndexes.LCCN, queryTemplate: 'lccn="%{query.query}"' },
  [queryIndexes.OCLC]: { label: 'ui-inventory.search.oclc', value: queryIndexes.OCLC, queryTemplate: 'oclc="%{query.query}"' },
  [queryIndexes.INSTANCE_NOTES]: { label: 'ui-inventory.search.instanceNotes', value: queryIndexes.INSTANCE_NOTES, queryTemplate: 'notes.note all "%{query.query}" or administrativeNotes all "%{query.query}"' },
  [queryIndexes.INSTANCE_ADMINISTRATIVE_NOTES]: { label: 'ui-inventory.search.instanceAdministrativeNotes', value: queryIndexes.INSTANCE_ADMINISTRATIVE_NOTES, queryTemplate: 'administrativeNotes all "%{query.query}"' },
  [queryIndexes.SUBJECT]: { label: 'ui-inventory.subject', value: queryIndexes.SUBJECT, queryTemplate: 'subjects.value==/string "%{query.query}"' },
  [queryIndexes.CALL_NUMBER]: { label: 'ui-inventory.effectiveCallNumberShelving', value: queryIndexes.CALL_NUMBER, queryTemplate: 'itemEffectiveShelvingOrder==/string "%{query.query}"' },
  [queryIndexes.INSTANCE_HRID]: { label: 'ui-inventory.instanceHrid', value: queryIndexes.INSTANCE_HRID, queryTemplate: 'hrid=="%{query.query}"' },
  [queryIndexes.INSTANCE_ID]: { label: 'ui-inventory.instanceId', value: queryIndexes.INSTANCE_ID, queryTemplate: 'id="%{query.query}"' },
  [queryIndexes.AUTHORITY_ID]: { label: 'ui-inventory.authorityId', value: queryIndexes.AUTHORITY_ID, queryTemplate: 'authorityId == %{query.query}' },
  [queryIndexes.ALL_FIELDS]: { label: 'ui-inventory.search.allFields', value: queryIndexes.ALL_FIELDS, queryTemplate: 'cql.all="%{query.query}"' },
  [queryIndexes.QUERY_SEARCH]: { label: 'ui-inventory.querySearch', value: queryIndexes.QUERY_SEARCH, queryTemplate: '%{query.query}' },
  [queryIndexes.ADVANCED_SEARCH]: { label: 'ui-inventory.advancedSearch', value: queryIndexes.ADVANCED_SEARCH, queryTemplate: '%{query.query}' },
  [queryIndexes.HOLDINGS_KEYWORD]: { label: 'ui-inventory.search.all', value: queryIndexes.HOLDINGS_KEYWORD, queryTemplate: 'keyword all "%{query.query}" or isbn="%{query.query}" or holdings.hrid=="%{query.query}" or holdings.id=="%{query.query}"' },
  [queryIndexes.HOLDINGS_FULL_CALL_NUMBERS]: { label: 'ui-inventory.callNumberEyeReadable', value: queryIndexes.HOLDINGS_FULL_CALL_NUMBERS, queryTemplate: 'holdingsFullCallNumbers="%{query.query}"' },
  [queryIndexes.CALL_NUMBER_NORMALIZED]: { label: 'ui-inventory.callNumberNormalized', value: queryIndexes.CALL_NUMBER_NORMALIZED, queryTemplate: 'holdingsNormalizedCallNumbers="%{query.query}"' },
  [queryIndexes.HOLDINGS_NOTES]: { label: 'ui-inventory.search.holdingsNotes', value: queryIndexes.HOLDINGS_NOTES, queryTemplate: 'holdings.notes.note all "%{query.query}" or holdings.administrativeNotes all "%{query.query}"' },
  [queryIndexes.HOLDINGS_ADMINISTRATIVE_NOTES]: { label: 'ui-inventory.search.holdingsAdministrativeNotes', value: queryIndexes.HOLDINGS_ADMINISTRATIVE_NOTES, queryTemplate: 'holdings.administrativeNotes all "%{query.query}"' },
  [queryIndexes.HOLDINGS_HRID]: { label: 'ui-inventory.holdingsHrid', value: queryIndexes.HOLDINGS_HRID, queryTemplate: 'holdings.hrid=="%{query.query}"' },
  [queryIndexes.HOLDINGS_ID]: { label: 'ui-inventory.search.holdings.uuid', value: queryIndexes.HOLDINGS_ID, queryTemplate: 'holdings.id=="%{query.query}"' },
  [queryIndexes.ITEMS_BARCODE]: { label: 'ui-inventory.barcode', value: queryIndexes.ITEMS_BARCODE, queryTemplate: 'items.barcode=="%{query.query}"' },
  [queryIndexes.ITEMS_KEYWORD]: { label: 'ui-inventory.search.all', value: queryIndexes.ITEMS_KEYWORD, queryTemplate: 'keyword all "%{query.query}" or isbn="%{query.query}" or item.hrid=="%{query.query}" or item.id=="%{query.query}"' },
  [queryIndexes.ITEM_FULL_CALL_NUMBERS]: { label: 'ui-inventory.itemEffectiveCallNumberEyeReadable', value: queryIndexes.ITEM_FULL_CALL_NUMBERS, queryTemplate: 'itemFullCallNumbers="%{query.query}"' },
  [queryIndexes.ITEM_NORMALIZED_CALL_NUMBERS]: { label: 'ui-inventory.itemEffectiveCallNumberNormalized', value: queryIndexes.ITEM_NORMALIZED_CALL_NUMBERS, queryTemplate: 'itemNormalizedCallNumbers="%{query.query}"' },
  [queryIndexes.ITEM_NOTES]: { label: 'ui-inventory.search.itemNotes', value: queryIndexes.ITEM_NOTES, queryTemplate: 'item.notes.note all "%{query.query}" or item.administrativeNotes all "%{query.query}"' },
  [queryIndexes.ITEM_ADMINISTRATIVE_NOTES]: { label: 'ui-inventory.search.itemAdministrativeNotes', value: queryIndexes.ITEM_ADMINISTRATIVE_NOTES, queryTemplate: 'item.administrativeNotes all "%{query.query}"' },
  [queryIndexes.ITEM_CIRCULATION_NOTES]: { label: 'ui-inventory.search.itemCirculationNotes', value: queryIndexes.ITEM_CIRCULATION_NOTES, queryTemplate: 'item.circulationNotes.note all "%{query.query}"' },
  [queryIndexes.ITEM_HRID]: { label: 'ui-inventory.itemHrid', value: queryIndexes.ITEM_HRID, queryTemplate: 'items.hrid=="%{query.query}"' },
  [queryIndexes.ITEM_ID]: { label: 'ui-inventory.search.item.uuid', value: queryIndexes.ITEM_ID, queryTemplate: 'item.id=="%{query.query}"' },
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
