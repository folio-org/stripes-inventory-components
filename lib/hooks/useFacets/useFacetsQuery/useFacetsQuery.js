import { useState } from 'react';
import { useQuery } from 'react-query';
import { useIntl } from 'react-intl';

import {
  useOkapiKy,
  useNamespace,
  useCallout,
  useStripes,
} from '@folio/stripes/core';

import {
  browseClassificationOptions,
  browseModeOptions,
  FACETS_KEY,
} from '../../../constants';
import { processSearchErrors } from '../../../utils';

const useFacetsQuery = ({
  qindex,
  searchParams,
  onSettled,
  enabled = true,
  tenantId,
}) => {
  const { query, facet } = searchParams;

  const ky = useOkapiKy({ tenant: tenantId });
  const stripes = useStripes();
  const callout = useCallout();
  const intl = useIntl();
  const [namespace] = useNamespace({ key: FACETS_KEY });

  const [allData, setAllData] = useState({});

  const host = stripes.okapi.url;

  const getPath = () => {
    if (qindex === browseModeOptions.CONTRIBUTORS) {
      return 'search/contributors/facets';
    } else if (qindex === browseModeOptions.SUBJECTS) {
      return 'search/subjects/facets';
    } else if (Object.values(browseClassificationOptions).includes(qindex)) {
      return 'search/classifications/facets';
    }
    return 'search/instances/facets';
  };

  const getSearchParams = () => {
    return {
      facet,
      query: query || 'id=*',
    };
  };

  const { isFetching } = useQuery(
    [namespace, searchParams, tenantId],
    async () => {
      const data = await ky.get(getPath(), {
        searchParams: getSearchParams(),
      }).json();

      // Collect data here since useQuery only returns data from the last call if a new request is made while
      // the previous one is running. This may happen when the internet speed is slow.
      setAllData(cur => ({ ...cur, ...data.facets }));

      return data;
    },
    {
      enabled: Boolean(facet && enabled),
      onSettled,
      onError: error => {
        processSearchErrors({
          error,
          callout,
          intl,
          pathname: getPath(),
          host,
          params: getSearchParams(),
        });
      },
    }
  );

  return {
    isFetching,
    data: allData,
  };
};

export { useFacetsQuery };
