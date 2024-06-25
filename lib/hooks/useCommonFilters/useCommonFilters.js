import {
  useCallback,
  useMemo,
} from 'react';

import { useNamespace } from '@folio/stripes/core';

import { useFacets } from '../useFacets';
import { getCurrentFilters } from '../../utils';
import { resetFacetSearchValue } from '../../stores/facetsStore';

const useCommonFilters = ({
  initialAccordionStates,
  data,
  query,
  segment,
  onChange,
}) => {
  const [namespace] = useNamespace();

  const handleClear = useCallback(name => {
    resetFacetSearchValue(name, namespace);
    onChange({ name, values: [] });
  }, [namespace, onChange, resetFacetSearchValue]);

  const activeFilters = useMemo(() => getCurrentFilters(query?.filters) || {}, [query]);
  const _query = useMemo(() => ({ segment, ...query }), [segment, query]);

  const {
    accordionStatus,
    facetOptions,
    onToggleAccordion,
    onInputFocusAndMoreClick,
    onFacetOptionSearch,
    getIsLoading,
  } = useFacets({
    initialAccordionStates,
    query: _query,
    activeFilters,
    data,
  });

  return {
    accordionStatus,
    activeFilters,
    facetOptions,
    getIsLoading,
    onClear: handleClear,
    onToggleAccordion,
    onInputFocusAndMoreClick,
    onFacetOptionSearch,
  };
};

export { useCommonFilters };
