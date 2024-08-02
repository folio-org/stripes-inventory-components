import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useStatisticalCodeTypesQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const [namespace] = useNamespace({ key: 'statistical-code-types' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('statistical-code-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions,
  });

  return {
    statisticalCodeTypes: data?.statisticalCodeTypes || [],
    isLoading: isFetching,
  };
};

export { useStatisticalCodeTypesQuery };
