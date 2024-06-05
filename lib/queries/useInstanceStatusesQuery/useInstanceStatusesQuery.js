import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceStatusesQuery = () => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'instance-statuses' });

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('instance-statuses?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    instanceStatuses: data?.instanceStatuses || [],
    isLoading: isFetching,
  };
};

export { useInstanceStatusesQuery };
