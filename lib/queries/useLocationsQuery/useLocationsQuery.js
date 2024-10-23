import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import {
  CQL_FIND_ALL,
  LIMIT_MAX,
} from '../../constants';

const useLocationsQuery = (options = {}) => {
  const { enabled = true, tenantId, ...otherOptions } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'locations' });

  const query = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: () => ky.get(`locations?limit=${LIMIT_MAX}&query=${CQL_FIND_ALL} sortby name`).json(),
    enabled,
    ...otherOptions,
  });

  return ({
    ...query,
    locations: query.data?.locations || [],
  });
};

export { useLocationsQuery };
