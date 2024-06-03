import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceTypesQuery = () => {
  const [namespace] = useNamespace({ key: 'instance-types' });
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('instance-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    instanceTypes: data?.instanceTypes || [],
    isLoading: isFetching,
  };
};

export { useInstanceTypesQuery };
