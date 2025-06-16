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
    const locationsOfAllTenants = consolidatedLocations?.locations;

    // The tenant's name is added in brackets for locations with the same name.
    const locationsWithTenantNameForDuplicates = locationsOfAllTenants?.map(location => {
      const isLocationIdDuplicate = locationsOfAllTenants.filter(_location => _location.id === location.id).length > 1;

      // don't add tenant name to locations which have duplicate ids across tenants
      // in future BE will make changes to make sure this doesn't happen, but for now
      // we'll just have to do this
      if (!isLocationIdDuplicate) {
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
