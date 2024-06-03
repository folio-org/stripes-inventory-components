import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useHoldingsSourcesQuery = () => {
  const [namespace] = useNamespace({ key: 'holdings-sources' });
  const ky = useOkapiKy();

  const { data, isFetching } = useQuery(
    [namespace],
    () => ky.get('holdings-sources?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    holdingsSources: data?.holdingsRecordsSources || [],
    isLoading: isFetching,
  };
};

export { useHoldingsSourcesQuery };
