import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useStatisticalCodesQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const [namespace] = useNamespace({ key: 'statistical-codes' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('statistical-codes?limit=2000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions
  });

  return {
    statisticalCodes: data?.statisticalCodes || [],
    isLoading: isFetching,
  };
};

export { useStatisticalCodesQuery };
