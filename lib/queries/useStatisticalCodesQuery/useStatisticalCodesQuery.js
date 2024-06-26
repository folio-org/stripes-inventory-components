import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useStatisticalCodesQuery = () => {
  const [namespace] = useNamespace({ key: 'statistical-codes' });
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('statistical-codes?limit=2000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    statisticalCodes: data?.statisticalCodes || [],
    isLoading: isFetching,
  };
};

export { useStatisticalCodesQuery };
