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
    () => ky.get(getPath(), {
      searchParams: {
        facet,
        query: query || 'id=*',
      },
    }).json(),
    {
      enabled: Boolean(facet),
      onSuccess: data => {
        setAllData(cur => ({ ...cur, ...data.facets }));
      },
      onSettled,
    }
  );

  return {
    isFetching,
    data: allData,
  };
};

export { useFacetsQuery };
