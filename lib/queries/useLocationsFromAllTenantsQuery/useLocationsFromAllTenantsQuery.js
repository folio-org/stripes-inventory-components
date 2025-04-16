import { useMemo } from 'react';
import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import { isConsortiaEnv } from '../../utils';

const DEFAULT_LOCATIONS = [];

const useLocationsFromAllTenantsQuery = ({ consortiaTenants = [], tenantId }) => {
  const [namespace] = useNamespace();
  const stripes = useStripes();
  const ky = useOkapiKy({ tenant: tenantId });

  const { data: consolidatedLocations, isFetching } = useQuery({
    queryKey: [namespace, 'consolidatedLocations', tenantId],
    queryFn: () => ky.get('search/consortium/locations').json(),
    enabled: Boolean(isConsortiaEnv(stripes)),
  });

  const locationsFromAllTenants = useMemo(() => {
    const locationsOfAllTenants = consolidatedLocations?.locations || [];

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
  }, [consolidatedLocations, consortiaTenants]);

  return {
    locationsFromAllTenants,
    isConsolidationLocationLoading: isFetching,
  };
};

export { useLocationsFromAllTenantsQuery };
