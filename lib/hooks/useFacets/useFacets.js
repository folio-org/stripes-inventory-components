import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import omit from 'lodash/omit';

import { useNamespace } from '@folio/stripes/core';

import { useFacetsQuery } from './useFacetsQuery';
import { useFacetOptions } from './useFacetOptions';
import { useFacetStates } from '../../stores/facetsStore';
import {
  getCqlQuery,
  getFacetCql,
  isFacet,
} from './utils';
import { FACETS_KEY } from '../../constants';

/*
1. When the user opens a facet, the first 6 options must be fetched for it;
2. When the user clicks the "+More" button under the options, all options for that facet must be fetched;
3. When the user places the cursor in a facet's input field, all options for it must be fetched;
4. When the user enters a value into a facet's input field, the facet's options must be filtered based on that value (done in the CheckboxFacet component).
5. When multiple facets are open and the user selects an option of any facet, options must be fetched for all open facets.
6. When multiple facets are open and the user submits a new value in the main search field, options must be fetched for all open facets.
- when a facet option is selected, and then another is selected from another facet, the first selected facet option may
become with count 0, and it should still be visible and moved to the bottom of the provided options. This is done in `getFacetOptions`.
- the "Contributor" search utilizes distinct queries for the "Search" lookup and the "Browse" search. When a user
selects a contributor record from the "Browse" search, they are redirected to the "Search" lookup. This redirection
request uses one specific query. If the user then clicks the search button again, without making any changes,
a different query is generated because the `selectedBrowseResult` parameter is removed. Therefore, even if the only
change made is to the `selectedBrowseResult`, all open facets need to be fetched.
*/

const useFacets = ({
  initialAccordionStates,
  query: queryObj,
  isBrowseLookup,
  activeFilters,
  data,
}) => {
  const { query, qindex } = queryObj;

  const [namespace] = useNamespace({ key: FACETS_KEY });
  const queryClient = useQueryClient();
  const { facetStates, setFacetStatesByName, setFacetStates } = useFacetStates();

  const [loadingFacetName, setLoadingFacetName] = useState('');
  const [isLoadingAllOpenFacets, setIsLoadingAllOpenFacets] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    const initialFacetStates = Object.entries(initialAccordionStates).map(([name, isOpen]) => ({
      name,
      isOpen,
      isFocused: false,
      isMoreClicked: false,
      value: '',
    }));

    setFacetStates(initialFacetStates);
  }, []);

  const buildQuery = useCallback(() => {
    const _queryObj = omit(queryObj, ['sort']);
    return getCqlQuery(isBrowseLookup, _queryObj, data);
  }, [isBrowseLookup, queryObj, data]);

  const { isFetching, data: facetsData } = useFacetsQuery({
    qindex,
    searchParams,
    onSettled: () => {
      setLoadingFacetName('');
      setIsLoadingAllOpenFacets(false);
    },
  });
  const { facetOptions } = useFacetOptions({ activeFilters, qindex, isBrowseLookup, data, facetsData, initialAccordionStates });

  // Fetch data every time (for the same search params)
  const fetchOnEveryCall = useCallback(facetCql => {
    const newSearchParams = {
      query: buildQuery(),
      facet: facetCql,
    };

    const queryKey = [namespace, newSearchParams];
    const queryCache = queryClient.getQueryCache().find({ queryKey });

    if (queryCache) {
      queryClient.invalidateQueries({ queryKey }).then(() => {
        setSearchParams(newSearchParams);
      });
    } else {
      setSearchParams(newSearchParams);
    }
  }, [namespace, queryClient, buildQuery]);

  // 1. Fetch 6 facet options when opening.
  const handleToggleAccordion = useCallback(({ id: name }) => {
    const facetState = facetStates.find(facet => facet.name === name);
    if (!facetState) {
      return;
    }
    const toggleAccordionState = () => setFacetStatesByName(name, { isOpen: !facetState.isOpen });

    if (!isFacet(name)) {
      toggleAccordionState();
      return;
    }

    if (!facetState.isOpen) {
      const facetCql = getFacetCql(name).default;

      setLoadingFacetName(name);
      fetchOnEveryCall(facetCql);
    }

    toggleAccordionState();
  }, [facetStates, fetchOnEveryCall]);

  // 2. Fetch all facet options when +More button clicked.
  // 3. Fetch all facet options when the cursor is placed into the facet's input field.
  const handleInputFocusAndMoreClick = useCallback(({ name, isMoreClicked = false, isFocused = false }) => {
    setFacetStatesByName(name, { isMoreClicked, isFocused });
    setLoadingFacetName(name);

    setSearchParams({
      query: buildQuery(),
      facet: getFacetCql(name).all,
    });
  }, [buildQuery]);

  // 4. Filter facet options based on the value entered into the facet input field (done in the CheckboxFacet component).
  const handleFacetOptionSearch = useCallback(({ name, value }) => {
    setFacetStatesByName(name, { value });
  }, []);

  // 5, 6. Fetch all open facets when a facet option is selected or a new value is submitted to the main search field.
  useEffect(() => {
    const isSomeFacetOpened = facetStates.some(facet => facet.isOpen);

    // Should fetch either all or 6 options. All options are for an open facet if the facet contains a value,
    // or an option is selected, or the +More button has been clicked. 6 options - for other open facets.
    const cqlOfOpenFacets = facetStates
      .filter(facet => facet.isOpen && isFacet(facet.name))
      .map(facet => {
        const isFacetOptionSelected = activeFilters[facet.name]?.length;

        if (facet.value || facet.isMoreClicked || isFacetOptionSelected) {
          return getFacetCql(facet.name).all;
        }
        return getFacetCql(facet.name).default;
      })
      .join(',');

    if (!isSomeFacetOpened || !cqlOfOpenFacets) return;

    setIsLoadingAllOpenFacets(true);

    setSearchParams({
      query: buildQuery(),
      facet: cqlOfOpenFacets,
    });
  }, [query, activeFilters, buildQuery]);

  const getIsLoading = useCallback(name => {
    return isFetching && (loadingFacetName === name || isLoadingAllOpenFacets);
  }, [isFetching, loadingFacetName, isLoadingAllOpenFacets]);

  const accordionStatus = useMemo(() => {
    return facetStates.reduce((acc, { name, isOpen }) => {
      acc[name] = isOpen;
      return acc;
    }, {});
  }, [facetStates]);

  return {
    accordionStatus,
    facetOptions,
    getIsLoading,
    onToggleAccordion: handleToggleAccordion,
    onInputFocusAndMoreClick: handleInputFocusAndMoreClick,
    onFacetOptionSearch: handleFacetOptionSearch,
  };
};

export { useFacets };
