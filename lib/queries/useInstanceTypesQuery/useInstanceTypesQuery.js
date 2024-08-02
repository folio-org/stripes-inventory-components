import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceTypesQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const [namespace] = useNamespace({ key: 'instance-types' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('instance-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions,
  });

  return {
    instanceTypes: data?.instanceTypes || [],
    isLoading: isFetching,
  };
};

export { useInstanceTypesQuery };
