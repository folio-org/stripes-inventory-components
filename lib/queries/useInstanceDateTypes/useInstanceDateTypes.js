import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  CQL_FIND_ALL,
  LIMIT_MAX,
} from '../../constants';

export const useInstanceDateTypes = ({ tenantId } = {}) => {
  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'instance-date-types' });

  const query = useQuery({
    queryKey: [namespace, 'instance-date-types', tenantId],
    queryFn: () => ky.get(`instance-date-types?limit=${LIMIT_MAX}&query=${CQL_FIND_ALL}`).json(),
  });

  return ({
    ...query,
    instanceDateTypes: query.data?.instanceDateTypes || [],
  });
};
