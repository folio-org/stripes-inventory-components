import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import omit from 'lodash/omit';

import { useStripes } from '@folio/stripes/core';

import { useFacetsQuery } from './useFacetsQuery';
import { useFacetOptions } from './useFacetOptions';
import { getCqlQuery } from './utils';
import {
  FACETS_TO_REQUEST,
  FACETS,
} from '../../constants';
import { getCurrentFilters } from '../../utils';

const useFacets = ({
  initialAccordionStates,
  query,
  isBrowseLookup = false,
  data,
  tenantId = null,
  segment = null,
}) => {
  const stripes = useStripes();
  const { qindex } = query;

  const [accordionsStatus, setAccordionsStatus] = useState(initialAccordionStates);

  const [loadingFacetName, setLoadingFacetName] = useState('');
  const [isLoadingAllOpenFacets, setIsLoadingAllOpenFacets] = useState(false);
  const prevAccordionsStatus = useRef({});

  const activeFilters = useMemo(() => {
    if (isBrowseLookup) {
      return omit(query || {}, ['qindex', 'query']);
    }
    return getCurrentFilters(query?.filters) || {};
  }, [query, isBrowseLookup]);

  const cqlQuery = useMemo(() => {
    const queryObj = omit(query, ['sort']);

    if (!stripes.hasPerm('ui-inventory.instance.staff-suppressed-records.view')) {
      queryObj.filters = `${queryObj.filters},${FACETS.STAFF_SUPPRESS}.false`;
    }

    return getCqlQuery(isBrowseLookup, queryObj, data, segment);
  }, [isBrowseLookup, query, data, segment]);

  const openedFacets = Object.keys(accordionsStatus).filter(name => accordionsStatus[name] && !/date/i.test(name));
  const facet = openedFacets.map(name => FACETS_TO_REQUEST[name]).join(',');

  // if the query is the same and the only change is a closed facet, then don't fetch facets.
  const isFacetClosing = useMemo(() => {
    const changedAccordions = [];

    Object.keys(accordionsStatus).forEach(accordionName => {
      if (accordionsStatus[accordionName] !== prevAccordionsStatus.current[accordionName]) {
        changedAccordions.push(accordionName);
      }
    });

    prevAccordionsStatus.current = accordionsStatus;

    return changedAccordions.length === 1 && !accordionsStatus[changedAccordions[0]];
  }, [accordionsStatus]);

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
    enabled: !isFacetClosing,
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

  useEffect(() => {
    if (isBrowseLookup) {
      // After changing the Browse search option, it is necessary to reset the initial state of the accordions,
      // since the search parameter "facet" is formed based on these states, and if we open facets in one search option
      // and then select another search option, the search parameter "facet" will be formed taking into account the
      // facets opened in the previous search option.
      setAccordionsStatus(initialAccordionStates);
    }
  }, [qindex]);

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
