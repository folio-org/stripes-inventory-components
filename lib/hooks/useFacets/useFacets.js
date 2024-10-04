import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import omit from 'lodash/omit';

import { useFacetsQuery } from './useFacetsQuery';
import { useFacetOptions } from './useFacetOptions';
import {
  getCqlQuery,
} from './utils';
import { FACETS_TO_REQUEST } from '../../constants';
import { getCurrentFilters } from '../../utils';

const useFacets = ({
  initialAccordionStates,
  query,
  isBrowseLookup = false,
  data,
  tenantId = null,
  segment = null,
}) => {
  const { qindex } = query;

  const [accordionsStatus, setAccordionsStatus] = useState(initialAccordionStates);

  const [loadingFacetName, setLoadingFacetName] = useState('');
  const [isLoadingAllOpenFacets, setIsLoadingAllOpenFacets] = useState(false);

  const activeFilters = useMemo(() => {
    if (isBrowseLookup) {
      return omit(query || {}, ['qindex', 'query']);
    }
    return getCurrentFilters(query?.filters) || {};
  }, [query, isBrowseLookup]);

  const cqlQuery = useMemo(() => {
    const queryObj = omit(query, ['sort']);
    return getCqlQuery(isBrowseLookup, queryObj, data, segment);
  }, [isBrowseLookup, query, data, segment]);

  const openedFacets = Object.keys(accordionsStatus).filter(name => accordionsStatus[name] && !/date/i.test(name));
  const facet = openedFacets.map(name => FACETS_TO_REQUEST[name]).join(',');

  const { isFetching, data: facetsData } = useFacetsQuery({
    qindex,
    searchParams: {
      query: cqlQuery,
      facet,
    },
    onSettled: () => {
      setLoadingFacetName('');
      setIsLoadingAllOpenFacets(false);
    },
    tenantId,
  });

  const { facetOptions } = useFacetOptions({ activeFilters, qindex, isBrowseLookup, data, facetsData });

  const handleToggleAccordion = useCallback(({ id: name }) => {
    setLoadingFacetName(name);
    setAccordionsStatus(cur => ({ ...cur, [name]: !cur[name] }));
  }, []);

  useEffect(() => {
    if (!openedFacets.length) return;

    setIsLoadingAllOpenFacets(true);
  }, [activeFilters, cqlQuery]);

  const getIsLoading = useCallback(name => {
    return isFetching && (loadingFacetName === name || isLoadingAllOpenFacets);
  }, [isFetching, loadingFacetName, isLoadingAllOpenFacets]);

  return {
    accordionsStatus,
    activeFilters,
    facetOptions,
    getIsLoading,
    onToggleAccordion: handleToggleAccordion,
  };
};

export { useFacets };
