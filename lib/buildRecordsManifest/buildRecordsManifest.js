import { buildSearchQuery } from '../buildSearchQuery';

export const buildRecordsManifest = (applyDefaultFilters) => {
  return {
    type: 'okapi',
    records: 'instances',
    resultOffset: '%{resultOffset}',
    perRequest: 100,
    throwErrors: false,
    path: 'inventory/instances',
    resultDensity: 'sparse',
    accumulate: 'true',
    tenant: '!{tenantId}',
    GET: {
      path: 'search/instances',
      params: {
        expandAll: true,
        query: buildSearchQuery(applyDefaultFilters),
      },
    },
  };
};
