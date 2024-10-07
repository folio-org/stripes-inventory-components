import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';

import { SharedFacet } from '../SharedFacet';
import { HeldByFacet } from '../HeldByFacet';
import { EffectiveLocationFacet } from '../EffectiveLocationFacet';
import { PermanentLocationFacet } from '../PermanentLocationFacet';
import { HoldingsTypeFacet } from '../HoldingsTypeFacet';
import { DiscoverySuppressFacet } from '../DiscoverySuppressFacet';
import { StatisticalCodeFacet } from '../StatisticalCodeFacet';
import { DateIntervalFilter } from '../DateIntervalFilter';
import { SourceFacet } from '../SourceFacet';
import { TagsFacet } from '../TagsFacet';

import { useFacets } from '../../hooks';
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

  const initialFacetStates = {
    [FACETS.SHARED]: false,
    [FACETS.HELD_BY]: false,
    [FACETS.EFFECTIVE_LOCATION]: false,
    [FACETS.HOLDINGS_PERMANENT_LOCATION]: false,
    [FACETS.HOLDINGS_DISCOVERY_SUPPRESS]: false,
    [FACETS.HOLDINGS_TAGS]: false,
    [FACETS.HOLDINGS_STATISTICAL_CODE_IDS]: false,
    [FACETS.HOLDINGS_SOURCE]: false,
    [FACETS.HOLDINGS_TYPE]: false,
  };

  const {
    accordionsStatus,
    activeFilters,
    facetOptions,
    onToggleAccordion,
    getIsLoading,
  } = useFacets({
    initialAccordionStates: initialFacetStates,
    query,
    data,
    tenantId,
    segment,
  });

  return (
    <>
      <SharedFacet
        name={FACETS.SHARED}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        facetOptions={facetOptions}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <HeldByFacet
        name={FACETS.HELD_BY}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        facetOptions={facetOptions}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <EffectiveLocationFacet
        name={FACETS.EFFECTIVE_LOCATION}
        facetOptions={facetOptions}
        separator={isConsortiaEnv(stripes)}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <PermanentLocationFacet
        name={FACETS.HOLDINGS_PERMANENT_LOCATION}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <HoldingsTypeFacet
        name={FACETS.HOLDINGS_TYPE}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <DiscoverySuppressFacet
        name={FACETS.HOLDINGS_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <StatisticalCodeFacet
        name={FACETS.HOLDINGS_STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <DateIntervalFilter
        name={FACETS.HOLDINGS_CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <DateIntervalFilter
        name={FACETS.HOLDINGS_UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <SourceFacet
        name={FACETS.HOLDINGS_SOURCE}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <TagsFacet
        name={FACETS.HOLDINGS_TAGS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
    </>
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
