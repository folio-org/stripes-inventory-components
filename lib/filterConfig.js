import {buildDateRangeQuery} from "./utils";
import {FACETS, FACETS_CQL} from "./constants";

export const filterConfigMap = {
  [FACETS.SHARED]: {
    name: FACETS.SHARED,
    cql: FACETS_CQL.SHARED,
    values: [],
  },
  [FACETS.CONTRIBUTORS_SHARED]: {
    name: FACETS.CONTRIBUTORS_SHARED,
    cql: FACETS_CQL.INSTANCES_SHARED,
    values: [],
  },
  [FACETS.SUBJECTS_SHARED]: {
    name: FACETS.SUBJECTS_SHARED,
    cql: FACETS_CQL.INSTANCES_SHARED,
    values: [],
  },
  [FACETS.CLASSIFICATION_SHARED]: {
    name: FACETS.CLASSIFICATION_SHARED,
    cql: FACETS_CQL.INSTANCES_SHARED,
    values: [],
  },
  [FACETS.HELD_BY]: {
    name: FACETS.HELD_BY,
    cql: FACETS_CQL.HELD_BY,
    values: [],
  },
  [FACETS.CONTRIBUTORS_HELD_BY]: {
    name: FACETS.CONTRIBUTORS_HELD_BY,
    cql: FACETS_CQL.INSTANCES_HELD_BY,
    values: [],
  },
  [FACETS.SUBJECTS_HELD_BY]: {
    name: FACETS.SUBJECTS_HELD_BY,
    cql: FACETS_CQL.INSTANCES_HELD_BY,
    values: [],
  },
  [FACETS.CALL_NUMBERS_HELD_BY]: {
    name: FACETS.CALL_NUMBERS_HELD_BY,
    cql: FACETS_CQL.HELD_BY,
    values: [],
  },
  [FACETS.EFFECTIVE_LOCATION]:   {
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
  ['location']: {
    name: 'location',
    cql: FACETS_CQL.HOLDINGS_PERMANENT_LOCATION,
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
  [FACETS.EFFECTIVE_LOCATION]: {
    name: FACETS.EFFECTIVE_LOCATION,
    cql: FACETS_CQL.EFFECTIVE_LOCATION,
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

