import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useNatureOfContentTermsQuery = (tenantId) => {
  const [namespace] = useNamespace({ key: 'nature-of-content-terms' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery(
    [namespace, tenantId],
    () => ky.get('nature-of-content-terms?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    natureOfContentTerms: data?.natureOfContentTerms || [],
    isLoading: isFetching,
  };
};

export { useNatureOfContentTermsQuery };
