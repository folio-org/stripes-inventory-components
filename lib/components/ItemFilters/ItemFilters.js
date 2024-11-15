import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';

import { SharedFacet } from '../SharedFacet';
import { HeldByFacet } from '../HeldByFacet';
import { StatusFacet } from '../StatusFacet';
import { EffectiveLocationFacet } from '../EffectiveLocationFacet';
import { PermanentLocationFacet } from '../PermanentLocationFacet';
import { MaterialTypeFacet } from '../MaterialTypeFacet';
import { DiscoverySuppressFacet } from '../DiscoverySuppressFacet';
import { StatisticalCodeFacet } from '../StatisticalCodeFacet';
import { DateIntervalFilter } from '../DateIntervalFilter';
import { TagsFacet } from '../TagsFacet';
import { isConsortiaEnv } from '../../utils';
import { FACETS } from '../../constants';
import { useFacets } from '../../hooks';

const ItemFilters = ({
  data,
  query,
  segment,
  onChange,
  tenantId,
  suppressSharedFacet,
}) => {
  const stripes = useStripes();

  const initialFacetStates = {
    [FACETS.SHARED]: false,
    [FACETS.HELD_BY]: false,
    [FACETS.ITEM_STATUS]: false,
    [FACETS.EFFECTIVE_LOCATION]: false,
    [FACETS.HOLDINGS_PERMANENT_LOCATION]: false,
    [FACETS.MATERIAL_TYPE]: false,
    [FACETS.ITEMS_DISCOVERY_SUPPRESS]: false,
    [FACETS.ITEMS_TAGS]: false,
    [FACETS.ITEMS_STATISTICAL_CODE_IDS]: false,
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
        suppressSharedFacet={suppressSharedFacet}
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
      <StatusFacet
        name={FACETS.ITEM_STATUS}
        facetOptions={facetOptions}
        separator={isConsortiaEnv(stripes)}
        accordionsStatus={accordionsStatus}
        activeFilters={activeFilters}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <EffectiveLocationFacet
        name={FACETS.EFFECTIVE_LOCATION}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <PermanentLocationFacet
        name={FACETS.HOLDINGS_PERMANENT_LOCATION}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <MaterialTypeFacet
        name={FACETS.MATERIAL_TYPE}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <DiscoverySuppressFacet
        name={FACETS.ITEMS_DISCOVERY_SUPPRESS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        getIsLoading={getIsLoading}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <StatisticalCodeFacet
        name={FACETS.ITEMS_STATISTICAL_CODE_IDS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
      <DateIntervalFilter
        name={FACETS.ITEMS_CREATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <DateIntervalFilter
        name={FACETS.ITEMS_UPDATED_DATE}
        activeFilters={activeFilters}
        onChange={onChange}
      />
      <TagsFacet
        name={FACETS.ITEMS_TAGS}
        facetOptions={facetOptions}
        activeFilters={activeFilters}
        accordionsStatus={accordionsStatus}
        onChange={onChange}
        onToggle={onToggleAccordion}
      />
    </>
  );
};

ItemFilters.propTypes = {
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  segment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
  suppressSharedFacet: PropTypes.bool,
};

export { ItemFilters };
