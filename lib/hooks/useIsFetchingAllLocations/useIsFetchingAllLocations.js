import { useIsFetching } from 'react-query';

import { useNamespace } from '@folio/stripes/core';

import { QUERY_KEY_LOCATIONS_FROM_ALL_TENANTS } from '../../constants';

const useIsFetchingAllLocations = () => {
  const [namespace] = useNamespace();
  // In the member tenant, locations from all tenants are fetched after the tenants are loaded, so these will be
  // subsequent requests. This adds a huge delay to the first render in the DataProvider. It is better to wait for
  // all locations here.
  const isLoadingLocationsFromAllTenants = !!useIsFetching({ queryKey: [namespace, QUERY_KEY_LOCATIONS_FROM_ALL_TENANTS] });

  return isLoadingLocationsFromAllTenants;
};

export { useIsFetchingAllLocations };
