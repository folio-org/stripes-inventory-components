import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useMaterialTypesQuery = () => {
  const [namespace] = useNamespace({ key: 'material-types' });
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('material-types?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    materialTypes: data?.mtypes || [],
    isLoading: isFetching,
  };
};

export { useMaterialTypesQuery };
