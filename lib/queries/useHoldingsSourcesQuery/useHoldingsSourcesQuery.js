import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useHoldingsSourcesQuery = (tenantId) => {
  const [namespace] = useNamespace({ key: 'holdings-sources' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery(
    [namespace, tenantId],
    () => ky.get('holdings-sources?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    holdingsSources: data?.holdingsRecordsSources || [],
    isLoading: isFetching,
  };
};

export { useHoldingsSourcesQuery };
