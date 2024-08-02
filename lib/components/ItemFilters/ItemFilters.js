import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import { AccordionSet } from '@folio/stripes/components';

import { SharedFacet } from '../SharedFacet';
import { HeldByFacet } from '../HeldByFacet';
import { StatusFacet } from '../StatusFacet';
import { EffectiveLocationFacet } from '../EffectiveLocationFacet';
import { PermanentLocationFacet } from '../PermanentLocationFacet';
import { MaterialTypeFacet } from '../MaterialTypeFacet';
import { DiscoverySuppressFacet } from '../DiscoverySuppressFacet';
import { StatisticalCodeFacet } from '../StatisticalCodeFacet';
import { DateRange } from '../DateRange';
import { TagsFacet } from '../TagsFacet';
import { isConsortiaEnv } from '../../utils';
import { FACETS } from '../../constants';
import { useCommonFilters } from '../../hooks';

const ItemFilters = ({
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
    [FACETS.ITEM_STATUS]: false,
    [FACETS.EFFECTIVE_LOCATION]: false,
    [FACETS.HOLDINGS_PERMANENT_LOCATION]: false,
    [FACETS.MATERIAL_TYPE]: false,
    [FACETS.ITEMS_DISCOVERY_SUPPRESS]: false,
    [FACETS.ITEMS_TAGS]: false,
    [FACETS.ITEMS_STATISTICAL_CODE_IDS]: false,
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
      <StatusFacet
        name={FACETS.ITEM_STATUS}
        facetOptions={facetOptions}
        separator={isConsortiaEnv(stripes)}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <EffectiveLocationFacet
        name={FACETS.EFFECTIVE_LOCATION}
        facetOptions={facetOptions}
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
      <MaterialTypeFacet
        name={FACETS.MATERIAL_TYPE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DiscoverySuppressFacet
        name={FACETS.ITEMS_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
      />
      <StatisticalCodeFacet
        name={FACETS.ITEMS_STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DateRange
        name={FACETS.ITEMS_CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <DateRange
        name={FACETS.ITEMS_UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <TagsFacet
        name={FACETS.ITEMS_TAGS}
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

ItemFilters.propTypes = {
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  segment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
};

export { ItemFilters };
