import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useHoldingsTypesQuery = () => {
  const [namespace] = useNamespace({ key: 'holdings-types' });
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('holdings-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    holdingsTypes: data?.holdingsTypes || [],
    isLoading: isFetching,
  };
};

export { useHoldingsTypesQuery };
