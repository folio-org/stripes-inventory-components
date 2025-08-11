export const CQL_FIND_ALL = 'cql.allRecords=1';
export const DEFAULT_FILTERS_NUMBER = 6;
export const LIMIT_MAX = 5000;
export const OKAPI_TENANT_HEADER = 'X-Okapi-Tenant';

export const SORT_OPTIONS = {
  TITLE: 'title',
  CONTRIBUTORS: 'contributors',
  DATE: 'normalizedDate1',
  RELEVANCE: 'relevance',
};
export const SEARCH_COLUMN_NAMES = {
  TITLE: SORT_OPTIONS.TITLE,
  CONTRIBUTORS: SORT_OPTIONS.CONTRIBUTORS,
  PUBLISHERS: 'publishers',
  DATE: SORT_OPTIONS.DATE,
  INSTANCE_HRID: 'hrid',
};
export const SEARCH_COLUMNS = {
  ...SEARCH_COLUMN_NAMES,
  SELECT: 'select',
  RELATION: 'relation',
  HRID: 'hrid',
};
export const TOGGLEABLE_COLUMNS = [
  SEARCH_COLUMNS.CONTRIBUTORS,
  SEARCH_COLUMNS.DATE,
  SEARCH_COLUMNS.PUBLISHERS,
  SEARCH_COLUMNS.RELATION,
  SEARCH_COLUMNS.HRID,
];
export const DEFAULT_SORT = 'title';
export const FAILED_TO_FETCH_ERROR = 'Failed to fetch';
export const HttpStatusCodes = {
  ERROR_URI_TOO_LONG: 414,
};

export const segments = {
  instances: 'instances',
  holdings: 'holdings',
  items: 'items',
};

export const SEARCH_PARAMS = {
  QUERY: 'query',
  FILTERS: 'filters',
  SORT: 'sort',
  QINDEX: 'qindex',
};
