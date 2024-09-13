import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import { AccordionSet } from '@folio/stripes/components';

import { SharedFacet } from '../SharedFacet';
import { HeldByFacet } from '../HeldByFacet';
import { EffectiveLocationFacet } from '../EffectiveLocationFacet';
import { PermanentLocationFacet } from '../PermanentLocationFacet';
import { HoldingsTypeFacet } from '../HoldingsTypeFacet';
import { DiscoverySuppressFacet } from '../DiscoverySuppressFacet';
import { StatisticalCodeFacet } from '../StatisticalCodeFacet';
import { DateTimeRangeFilter } from '../DateTimeRangeFilter';
import { DateIntervalFilter } from '../DateIntervalFilter';
import { SourceFacet } from '../SourceFacet';
import { TagsFacet } from '../TagsFacet';

import { useCommonFilters } from '../../hooks';
import { isConsortiaEnv } from '../../utils';
import { FACETS } from '../../constants';

const HoldingsRecordFilters = ({
  data,
  query,
  segment,
  onChange,
  tenantId,
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

  const {
    accordionStatus,
    activeFilters,
    facetOptions,
    onClear,
    getIsLoading,
    onToggleAccordion,
    onInputFocusAndMoreClick,
    onFacetOptionSearch,
  } = useCommonFilters({
    initialAccordionStates,
    data,
    query,
    segment,
    onChange,
    tenantId,
  });

  return (
    <AccordionSet accordionStatus={accordionStatus} onToggle={onToggleAccordion}>
      <SharedFacet
        name={FACETS.SHARED}
        activeFilters={activeFilters}
        facetOptions={facetOptions}
        onChange={onChange}
        onClear={onClear}
        getIsLoading={getIsLoading}
      />
      <HeldByFacet
        name={FACETS.HELD_BY}
        activeFilters={activeFilters}
        facetOptions={facetOptions}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
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
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <PermanentLocationFacet
        name={FACETS.HOLDINGS_PERMANENT_LOCATION}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <HoldingsTypeFacet
        name={FACETS.HOLDINGS_TYPE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DiscoverySuppressFacet
        name={FACETS.HOLDINGS_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
      />
      <StatisticalCodeFacet
        name={FACETS.HOLDINGS_STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DateTimeRangeFilter
        name={FACETS.DATE_RANGE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <DateIntervalFilter
        name={FACETS.HOLDINGS_CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <DateIntervalFilter
        name={FACETS.HOLDINGS_UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <SourceFacet
        name={FACETS.HOLDINGS_SOURCE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <TagsFacet
        name={FACETS.HOLDINGS_TAGS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
    </AccordionSet>
  );
};

HoldingsRecordFilters.propTypes = {
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  segment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
};

export { HoldingsRecordFilters };
