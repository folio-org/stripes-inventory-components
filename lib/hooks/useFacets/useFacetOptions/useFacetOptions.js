import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import {
  browseModeOptions,
  FACETS,
  FACETS_CQL,
} from '../../../constants';
import {
  getFacetOptions,
  getItemStatusesOptions,
  getLanguageOptions,
  getSharedOptions,
  getSourceOptions,
  getStatisticalCodeOptions,
  getSuppressedOptions
} from './utils';

const useFacetOptions = ({ activeFilters, qindex, isBrowseLookup, data, facetsData }) => {
  const intl = useIntl();

  const optionsMap = useMemo(() => {
    return {
      [FACETS_CQL.SHARED]: (values) => getSharedOptions(activeFilters[FACETS.SHARED], values),
      [FACETS_CQL.INSTANCES_SHARED]: (values) => {
        const sharedMap = {
          [browseModeOptions.CLASSIFICATION_ALL]: FACETS.CLASSIFICATION_SHARED,
          [browseModeOptions.DEWEY_CLASSIFICATION]: FACETS.CLASSIFICATION_SHARED,
          [browseModeOptions.LC_CLASSIFICATION]: FACETS.CLASSIFICATION_SHARED,
          [browseModeOptions.CONTRIBUTORS]: FACETS.CONTRIBUTORS_SHARED,
          [browseModeOptions.SUBJECTS]: FACETS.SUBJECTS_SHARED,
        };
        const name = sharedMap[qindex];
        return getSharedOptions(activeFilters[name], values);
      },
      [FACETS_CQL.HELD_BY]: (values) => {
        const heldByMap = {
          [browseModeOptions.CALL_NUMBERS]: FACETS.CALL_NUMBERS_HELD_BY,
          [browseModeOptions.CONTRIBUTORS]: FACETS.CONTRIBUTORS_HELD_BY,
          [browseModeOptions.SUBJECTS]: FACETS.SUBJECTS_HELD_BY,
        };
        const name = isBrowseLookup ? heldByMap[qindex] : FACETS.HELD_BY;
        return getFacetOptions(activeFilters[name], values, data.consortiaTenants);
      },
      [FACETS_CQL.INSTANCES_HELD_BY]: (values) => {
        const heldByFacetMap = {
          [browseModeOptions.CONTRIBUTORS]: FACETS.CONTRIBUTORS_HELD_BY,
          [browseModeOptions.SUBJECTS]: FACETS.SUBJECTS_HELD_BY,
        };
        const name = heldByFacetMap[qindex];
        return getFacetOptions(activeFilters[name], values, data.consortiaTenants);
      },
      [FACETS_CQL.EFFECTIVE_LOCATION]: (values) => getFacetOptions(activeFilters[FACETS.EFFECTIVE_LOCATION], values, data.locations),
      [FACETS_CQL.LANGUAGES]: (values) => getLanguageOptions(activeFilters[FACETS.LANGUAGE], intl, values),
      [FACETS_CQL.INSTANCE_TYPE]: (values) => getFacetOptions(activeFilters[FACETS.RESOURCE], values, data.instanceTypes),
      [FACETS_CQL.INSTANCE_FORMAT]: (values) => getFacetOptions(activeFilters[FACETS.FORMAT], values, data.instanceFormats),
      [FACETS_CQL.MODE_OF_ISSUANCE]: (values) => getFacetOptions(activeFilters[FACETS.MODE], values, data.modesOfIssuance),
      [FACETS_CQL.NATURE_OF_CONTENT]: (values) => getFacetOptions(activeFilters[FACETS.NATURE_OF_CONTENT], values, data.natureOfContentTerms),
      [FACETS_CQL.STAFF_SUPPRESS]: (values) => getSuppressedOptions(activeFilters[FACETS.STAFF_SUPPRESS], values),
      [FACETS_CQL.INSTANCES_DISCOVERY_SUPPRESS]: (values) => getSuppressedOptions(activeFilters[FACETS.INSTANCES_DISCOVERY_SUPPRESS], values),
      [FACETS_CQL.SOURCE]: (values) => getSourceOptions(activeFilters[FACETS.SOURCE], values),
      [FACETS_CQL.STATUS]: (values) => getFacetOptions(activeFilters[FACETS.STATUS], values, data.instanceStatuses),
      [FACETS_CQL.STATISTICAL_CODE_IDS]: (values) => getStatisticalCodeOptions(activeFilters[FACETS.STATISTICAL_CODE_IDS], values, data.statisticalCodes),
      [FACETS_CQL.INSTANCES_TAGS]: (values) => getSourceOptions(activeFilters[FACETS.INSTANCES_TAGS], values),
      [FACETS_CQL.NAME_TYPE]: (values) => getFacetOptions(activeFilters[FACETS.NAME_TYPE], values, data.contributorNameTypes),
      [FACETS_CQL.HOLDINGS_PERMANENT_LOCATION]: (values) => getFacetOptions(activeFilters[FACETS.HOLDINGS_PERMANENT_LOCATION], values, data.locations),
      [FACETS_CQL.HOLDINGS_DISCOVERY_SUPPRESS]: (values) => getSuppressedOptions(activeFilters[FACETS.HOLDINGS_DISCOVERY_SUPPRESS], values),
      [FACETS_CQL.HOLDINGS_STATISTICAL_CODE_IDS]: (values) => getStatisticalCodeOptions(activeFilters[FACETS.HOLDINGS_STATISTICAL_CODE_IDS], values, data.statisticalCodes),
      [FACETS_CQL.HOLDINGS_SOURCE]: (values) => getFacetOptions(activeFilters[FACETS.HOLDINGS_SOURCE], values, data.holdingsSources),
      [FACETS_CQL.HOLDINGS_TAGS]: (values) => getSourceOptions(activeFilters[FACETS.HOLDINGS_TAGS], values),
      [FACETS_CQL.HOLDINGS_TYPE]: (values) => getFacetOptions(activeFilters[FACETS.HOLDINGS_TYPE], values, data.holdingsTypes),
      [FACETS_CQL.ITEMS_STATUSES]: (values) => getItemStatusesOptions(activeFilters[FACETS.ITEM_STATUS], values, intl),
      [FACETS_CQL.MATERIAL_TYPES]: (values) => getFacetOptions(activeFilters[FACETS.MATERIAL_TYPE], values, data.materialTypes),
      [FACETS_CQL.ITEMS_STATISTICAL_CODE_IDS]: (values) => getStatisticalCodeOptions(activeFilters[FACETS.ITEMS_STATISTICAL_CODE_IDS], values, data.statisticalCodes),
      [FACETS_CQL.ITEMS_DISCOVERY_SUPPRESS]: (values) => getSuppressedOptions(activeFilters[FACETS.ITEMS_DISCOVERY_SUPPRESS], values),
      [FACETS_CQL.ITEMS_TAGS]: (values) => getSourceOptions(activeFilters[FACETS.ITEMS_TAGS], values),
    };
  }, [activeFilters, data]);

  const facetOptions = useMemo(() => {
    return Object.keys(facetsData).reduce((acc, facetCql) => {
      const options = optionsMap[facetCql](facetsData[facetCql].values);

      if (options) {
        acc[facetCql] = options;
      }

      return acc;
    }, {});
  }, [facetsData, optionsMap]);

  return {
    facetOptions,
  };
};

export { useFacetOptions };
