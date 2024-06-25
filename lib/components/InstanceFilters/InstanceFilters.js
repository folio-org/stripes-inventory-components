import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import { AccordionSet } from '@folio/stripes/components';

import { SharedFacet } from '../SharedFacet';
import { HeldByFacet } from '../HeldByFacet';
import { EffectiveLocationFacet } from '../EffectiveLocationFacet';
import { LanguageFacet } from '../LanguageFacet';
import { ResourceTypeFacet } from '../ResourceTypeFacet';
import { FormatFacet } from '../FormatFacet';
import { ModeIssuanceFacet } from '../ModeIssuanceFacet';
import { NatureOfContentFacet } from '../NatureOfContentFacet';
import { StaffSuppressFacet } from '../StaffSuppressFacet';
import { DiscoverySuppressFacet } from '../DiscoverySuppressFacet';
import { StatisticalCodeFacet } from '../StatisticalCodeFacet';
import { DateRange } from '../DateRange';
import { StatusFacet } from '../StatusFacet';
import { SourceFacet } from '../SourceFacet';
import { TagsFacet } from '../TagsFacet';
import { isConsortiaEnv } from '../../utils';
import { FACETS } from '../../constants';
import { useCommonFilters } from '../../hooks';

const InstanceFilters = ({
  data,
  query,
  segment,
  onChange,
}) => {
  const stripes = useStripes();

  const initialAccordionStates = useMemo(() => ({
    [FACETS.SHARED]: false,
    [FACETS.HELD_BY]: false,
    [FACETS.EFFECTIVE_LOCATION]: false,
    [FACETS.LANGUAGE]: false,
    [FACETS.RESOURCE]: false,
    [FACETS.FORMAT]: false,
    [FACETS.MODE]: false,
    [FACETS.NATURE_OF_CONTENT]: false,
    [FACETS.STAFF_SUPPRESS]: false,
    [FACETS.INSTANCES_DISCOVERY_SUPPRESS]: false,
    [FACETS.CREATED_DATE]: false,
    [FACETS.UPDATED_DATE]: false,
    [FACETS.SOURCE]: false,
    [FACETS.STATUS]: false,
    [FACETS.INSTANCES_TAGS]: false,
    [FACETS.STATISTICAL_CODE_IDS]: false,
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
      <LanguageFacet
        name={FACETS.LANGUAGE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <ResourceTypeFacet
        name={FACETS.RESOURCE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <FormatFacet
        name={FACETS.FORMAT}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <ModeIssuanceFacet
        name={FACETS.MODE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <NatureOfContentFacet
        name={FACETS.NATURE_OF_CONTENT}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <StaffSuppressFacet
        name={FACETS.STAFF_SUPPRESS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
      />
      <DiscoverySuppressFacet
        name={FACETS.INSTANCES_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
      />
      <StatisticalCodeFacet
        name={FACETS.STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <DateRange
        name={FACETS.CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <DateRange
        name={FACETS.UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
        onClear={onClear}
      />
      <StatusFacet
        name={FACETS.STATUS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
        onSearch={onFacetOptionSearch}
      />
      <SourceFacet
        name={FACETS.SOURCE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onClear={onClear}
        onFetch={onInputFocusAndMoreClick}
      />
      <TagsFacet
        name={FACETS.INSTANCES_TAGS}
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

InstanceFilters.propTypes = {
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  segment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { InstanceFilters };
