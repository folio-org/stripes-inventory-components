import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useModesOfIssuanceQuery = (tenantId) => {
  const [namespace] = useNamespace({ key: 'modes-of-issuance' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery(
    [namespace, tenantId],
    () => ky.get('modes-of-issuance?limit=1000&query=cql.allRecords=1 sortby name').json(),
  );

  return {
    modesOfIssuance: data?.issuanceModes || [],
    isLoading: isFetching,
  };
};

export { useModesOfIssuanceQuery };
