import {
  useQueries,
  useQuery,
} from 'react-query';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
  checkIfUserInCentralTenant,
} from '@folio/stripes/core';

import { isConsortiaEnv } from '../../utils';
import {
  CQL_FIND_ALL,
  LIMIT_MAX,
  OKAPI_TENANT_HEADER,
} from '../../constants';

const useLocationsFromAllTenantsQuery = ({ tenantIds = [] }) => {
  const [namespace] = useNamespace();
  const stripes = useStripes();
  const ky = useOkapiKy();

  const isUserInCentralTenant = checkIfUserInCentralTenant(stripes);

  const queries = useQueries(tenantIds.map(tenantId => {
    return {
      enabled: Boolean(tenantIds.length && isConsortiaEnv(stripes) && !isUserInCentralTenant),
      queryKey: [namespace, 'locations', tenantId],
      queryFn: () => ky.get('locations', {
        searchParams: {
          query: CQL_FIND_ALL,
          limit: LIMIT_MAX,
        },
        hooks: {
          beforeRequest: [
            request => {
              request.headers.set(OKAPI_TENANT_HEADER, tenantId);
            },
          ],
        },
      }).json(),
    };
  }));

  const { data: consolidatedLocations } = useQuery({
    queryKey: [namespace, 'consolidatedLocations'],
    queryFn: () => ky.get('search/consortium/locations').json(),
    enabled: Boolean(isConsortiaEnv(stripes) && isUserInCentralTenant),
  });

  const locationsFromAllTenants = isUserInCentralTenant
    ? consolidatedLocations?.locations
    : queries.map(({ data }) => data?.locations).filter(Boolean).flat();

  return {
    locationsFromAllTenants: locationsFromAllTenants || [],
    isLoading: queries.some(({ isFetching }) => isFetching),
  };
};

export { useLocationsFromAllTenantsQuery };
