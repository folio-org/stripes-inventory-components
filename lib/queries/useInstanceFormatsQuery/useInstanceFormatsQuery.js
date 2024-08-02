import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceFormatsQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const [namespace] = useNamespace({ key: 'instance-formats' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('instance-formats?limit=1000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions,
  });

  return {
    instanceFormats: data?.instanceFormats || [],
    isLoading: isFetching,
  };
};

export { useInstanceFormatsQuery };
