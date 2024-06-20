import { useMemo } from 'react';
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
  QUERY_KEY_LOCATIONS_FROM_ALL_TENANTS,
} from '../../constants';

const DEFAULT_LOCATIONS = [];

const useLocationsFromAllTenantsQuery = ({ consortiaTenants = [] }) => {
  const [namespace] = useNamespace();
  const stripes = useStripes();
  const ky = useOkapiKy();

  const tenantIds = consortiaTenants.map(tenant => tenant.id);
  const isUserInCentralTenant = checkIfUserInCentralTenant(stripes);

  const queries = useQueries(tenantIds.map(tenantId => {
    return {
      enabled: Boolean(tenantIds.length && isConsortiaEnv(stripes) && !isUserInCentralTenant),
      queryKey: [namespace, QUERY_KEY_LOCATIONS_FROM_ALL_TENANTS, tenantId],
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
      }).json()
        .then(response => ({
          ...response,
          locations: response.locations.map(location => ({
            ...location,
            tenantId,
          })),
        })),
    };
  }));

  const { data: consolidatedLocations, isFetching } = useQuery({
    queryKey: [namespace, 'consolidatedLocations'],
    queryFn: () => ky.get('search/consortium/locations').json(),
    enabled: Boolean(isConsortiaEnv(stripes) && isUserInCentralTenant),
  });

  const locationsFromAllTenants = useMemo(() => {
    const locationsOfAllTenants = isUserInCentralTenant
      ? consolidatedLocations?.locations
      : queries.map(({ data }) => data?.locations).filter(Boolean).flat();

    const locationCounts = locationsOfAllTenants?.reduce((acc, location) => {
      acc[location.name] = (acc[location.name] ?? 0) + 1;
      return acc;
    }, {});

    // The tenant's name is added in brackets for locations with the same name.
    const locationsWithTenantNameForDuplicates = locationsOfAllTenants?.map(location => {
      if (locationCounts[location.name] > 1) {
        const tenantName = consortiaTenants.find(tenant => tenant.id === location.tenantId)?.name;

        return {
          ...location,
          name: `${location.name} (${tenantName})`,
        };
      }

      return location;
    });

    return locationsWithTenantNameForDuplicates?.length
      ? locationsWithTenantNameForDuplicates
      : DEFAULT_LOCATIONS;
  }, [isUserInCentralTenant, consolidatedLocations, queries, consortiaTenants]);

  return {
    locationsFromAllTenants,
    isConsolidationLocationLoading: isFetching,
  };
};

export { useLocationsFromAllTenantsQuery };
