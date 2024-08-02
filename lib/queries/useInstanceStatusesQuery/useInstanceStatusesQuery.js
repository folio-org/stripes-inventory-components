import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceStatusesQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'instance-statuses' });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('instance-statuses?limit=1000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions,
  });

  return {
    instanceStatuses: data?.instanceStatuses || [],
    isLoading: isFetching,
  };
};

export { useInstanceStatusesQuery };
