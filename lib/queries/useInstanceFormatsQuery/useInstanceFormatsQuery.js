import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useInstanceFormatsQuery = () => {
  const [namespace] = useNamespace({ key: 'instance-formats' });
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('instance-formats?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    instanceFormats: data?.instanceFormats || [],
    isLoading: isFetching,
  };
};

export { useInstanceFormatsQuery };
