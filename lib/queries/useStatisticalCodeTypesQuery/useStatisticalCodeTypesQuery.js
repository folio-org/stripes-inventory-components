import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useStatisticalCodeTypesQuery = (tenantId) => {
  const [namespace] = useNamespace({ key: 'statistical-code-types' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery(
    [namespace, tenantId],
    () => ky.get('statistical-code-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    statisticalCodeTypes: data?.statisticalCodeTypes || [],
    isLoading: isFetching,
  };
};

export { useStatisticalCodeTypesQuery };
