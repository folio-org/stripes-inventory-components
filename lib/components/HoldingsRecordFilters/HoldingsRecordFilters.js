import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { useStripes } from '@folio/stripes/core';
import { AccordionSet } from '@folio/stripes/components';

import { SharedFacet } from '../SharedFacet';
import { HeldByFacet } from '../HeldByFacet';
import { EffectiveLocationFacet } from '../EffectiveLocationFacet';
import { PermanentLocationFacet } from '../PermanentLocationFacet';
import { HoldingsTypeFacet } from '../HoldingsTypeFacet';
import { DiscoverySuppressFacet } from '../DiscoverySuppressFacet';
import { StatisticalCodeFacet } from '../StatisticalCodeFacet';
import { DateRange } from '../DateRange';
import { SourceFacet } from '../SourceFacet';
import { TagsFacet } from '../TagsFacet';

import { useFacets } from '../../hooks';
import {
  getCurrentFilters,
  isConsortiaEnv,
} from '../../utils';
import { FACETS } from '../../constants';
import { resetFacetSearchValue } from '../../stores/facetsStore';

const HoldingsRecordFilters = ({
  activeFilters: pluginActiveFilters,
  data,
  query,
  onChange,
}) => {
  const stripes = useStripes();

  const initialAccordionStates = useMemo(() => ({
    [FACETS.SHARED]: false,
    [FACETS.HELD_BY]: false,
    [FACETS.EFFECTIVE_LOCATION]: false,
    [FACETS.HOLDINGS_PERMANENT_LOCATION]: false,
    [FACETS.HOLDINGS_DISCOVERY_SUPPRESS]: false,
    [FACETS.HOLDINGS_TAGS]: false,
    [FACETS.HOLDINGS_CREATED_DATE]: false,
    [FACETS.HOLDINGS_UPDATED_DATE]: false,
    [FACETS.HOLDINGS_STATISTICAL_CODE_IDS]: false,
    [FACETS.HOLDINGS_SOURCE]: false,
    [FACETS.HOLDINGS_TYPE]: false,
  }), []);

  const handleClear = useCallback(name => {
    resetFacetSearchValue(name);
    onChange({ name, values: [] });
  }, [onChange, resetFacetSearchValue]);

  const inventoryActiveFilters = useMemo(() => getCurrentFilters(get(query, 'filters', '')) || {}, [query]);
  const activeFilters = pluginActiveFilters || inventoryActiveFilters;

  const {
    accordionStatus,
    facetOptions,
    onToggleAccordion,
    onInputFocusAndMoreClick,
    onFacetOptionSearch,
    getIsLoading,
  } = useFacets({
    initialAccordionStates,
    query,
    activeFilters,
    data,
  });

  return (
    <AccordionSet accordionStatus={accordionStatus} onToggle={onToggleAccordion}>
      <SharedFacet
        name={FACETS.SHARED}
        activeFilters={activeFilters}
        facetOptions={facetOptions}
        onChange={onChange}
        onClear={handleClear}
        getIsLoading={getIsLoading}
      />
      <HeldByFacet
        name={FACETS.HELD_BY}
        activeFilters={activeFilters}
        facetOptions={facetOptions}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <EffectiveLocationFacet
        name={FACETS.EFFECTIVE_LOCATION}
        facetOptions={facetOptions}
        separator={isConsortiaEnv(stripes)}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <PermanentLocationFacet
        name={FACETS.HOLDINGS_PERMANENT_LOCATION}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <HoldingsTypeFacet
        name={FACETS.HOLDINGS_TYPE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DiscoverySuppressFacet
        name={FACETS.HOLDINGS_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
      />
      <StatisticalCodeFacet
        name={FACETS.HOLDINGS_STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DateRange
        name={FACETS.HOLDINGS_CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={handleClear}
      />
      <DateRange
        name={FACETS.HOLDINGS_UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={handleClear}
      />
      <SourceFacet
        name={FACETS.HOLDINGS_SOURCE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <TagsFacet
        name={FACETS.HOLDINGS_TAGS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={handleClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
    </AccordionSet>
  );
};

HoldingsRecordFilters.propTypes = {
  activeFilters: PropTypes.object,
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { HoldingsRecordFilters };
