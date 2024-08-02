import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useHoldingsTypesQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const [namespace] = useNamespace({ key: 'holdings-types' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('holdings-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions,
  });

  return {
    holdingsTypes: data?.holdingsTypes || [],
    isLoading: isFetching,
  };
};

export { useHoldingsTypesQuery };
