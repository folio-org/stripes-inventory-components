import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';

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
import { DateTimeRangeFilter } from '../DateTimeRangeFilter';
import { DateIntervalFilter } from '../DateIntervalFilter';
import { StatusFacet } from '../StatusFacet';
import { SourceFacet } from '../SourceFacet';
import { TagsFacet } from '../TagsFacet';
import { isConsortiaEnv } from '../../utils';
import { FACETS } from '../../constants';
import { useFacets } from '../../hooks';

const InstanceFilters = ({
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
    [FACETS.LANGUAGE]: false,
    [FACETS.RESOURCE]: false,
    [FACETS.FORMAT]: false,
    [FACETS.MODE]: false,
    [FACETS.NATURE_OF_CONTENT]: false,
    [FACETS.STAFF_SUPPRESS]: false,
    [FACETS.INSTANCES_DISCOVERY_SUPPRESS]: false,
    [FACETS.SOURCE]: false,
    [FACETS.STATUS]: false,
    [FACETS.INSTANCES_TAGS]: false,
    [FACETS.STATISTICAL_CODE_IDS]: false,
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
      <LanguageFacet
        name={FACETS.LANGUAGE}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <ResourceTypeFacet
        name={FACETS.RESOURCE}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <FormatFacet
        name={FACETS.FORMAT}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <ModeIssuanceFacet
        name={FACETS.MODE}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <NatureOfContentFacet
        name={FACETS.NATURE_OF_CONTENT}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <StaffSuppressFacet
        name={FACETS.STAFF_SUPPRESS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <DiscoverySuppressFacet
        name={FACETS.INSTANCES_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <StatisticalCodeFacet
        name={FACETS.STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <DateTimeRangeFilter
        name={FACETS.DATE_RANGE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <DateIntervalFilter
        name={FACETS.CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <DateIntervalFilter
        name={FACETS.UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <StatusFacet
        name={FACETS.STATUS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <SourceFacet
        name={FACETS.SOURCE}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <TagsFacet
        name={FACETS.INSTANCES_TAGS}
        facetOptions={facetOptions}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
    </>
  );
};

InstanceFilters.propTypes = {
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  segment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
};

export { InstanceFilters };
