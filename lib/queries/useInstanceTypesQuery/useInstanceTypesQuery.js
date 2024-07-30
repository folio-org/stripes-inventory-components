import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceTypesQuery = (tenantId) => {
  const [namespace] = useNamespace({ key: 'instance-types' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery(
    [namespace, tenantId],
    () => ky.get('instance-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    instanceTypes: data?.instanceTypes || [],
    isLoading: isFetching,
  };
};

export { useInstanceTypesQuery };
