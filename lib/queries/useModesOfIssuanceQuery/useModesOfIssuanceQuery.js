import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

const useModesOfIssuanceQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const [namespace] = useNamespace({ key: 'modes-of-issuance' });
  const ky = useOkapiKy({ tenant: tenantId });

  const { data, isFetching } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get('modes-of-issuance?limit=1000&query=cql.allRecords=1 sortby name').json(),
    enabled,
    ...otherOptions,
  });

  return {
    modesOfIssuance: data?.issuanceModes || [],
    isLoading: isFetching,
  };
};

export { useModesOfIssuanceQuery };
