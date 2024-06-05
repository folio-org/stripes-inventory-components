import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

const useConsortiaTenantsQuery = () => {
  const stripes = useStripes();
  const [namespace] = useNamespace();

  const { centralTenantId, id: consortiumId } = stripes.user.user.consortium || {};

  const ky = useOkapiKy({ tenant: centralTenantId });

  const { data, isFetching } = useQuery(
    [namespace, consortiumId],
    () => ky.get(`consortia/${consortiumId}/tenants?limit=1000`).json(),
    {
      enabled: Boolean(consortiumId),
    },
  );

  return {
    consortiaTenants: data?.tenants,
    isLoading: isFetching,
  };
};

export { useConsortiaTenantsQuery };
