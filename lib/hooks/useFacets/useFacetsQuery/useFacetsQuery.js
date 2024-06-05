import { useState } from 'react';
import { useQuery } from 'react-query';

import {
  useOkapiKy,
  useNamespace,
} from '@folio/stripes/core';

import {
  browseClassificationOptions,
  browseModeOptions,
  FACETS_KEY,
} from '../../../constants';

const useFacetsQuery = ({ qindex, searchParams, onSettled }) => {
  const { query, facet } = searchParams;

  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: FACETS_KEY });

  const [allData, setAllData] = useState({});

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

  const { isFetching } = useQuery(
    [namespace, searchParams],
    async () => {
      const data = await ky.get(getPath(), {
        searchParams: {
          facet,
          query: query || 'id=*',
        },
      }).json();

      // Collect data here since useQuery only returns data from the last call if a new request is made while
      // the previous one is running. This may happen when the internet speed is slow.
      setAllData(cur => ({ ...cur, ...data.facets }));

      return data;
    },
    {
      enabled: Boolean(facet),
      onSettled,
    }
  );

  return {
    isFetching,
    data: allData,
  };
};

export { useFacetsQuery };
