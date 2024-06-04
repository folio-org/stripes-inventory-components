import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';

import { useStripes } from '@folio/stripes/core';

import {
  useConsortiaTenantsQuery,
  useLocationsFromAllTenantsQuery,
  useLocationsQuery,
  useMaterialTypesQuery,
  useNatureOfContentTermsQuery,
  useHoldingsTypesQuery,
  useStatisticalCodesQuery,
  useModesOfIssuanceQuery,
  useInstanceStatusesQuery,
  useInstanceFormatsQuery,
  useHoldingsSourcesQuery,
  useInstanceTypesQuery,
  useStatisticalCodeTypesQuery,
} from '../../queries';
import { isConsortiaEnv } from '../../utils';

const useCommonData = () => {
  const stripes = useStripes();

  const { consortiaTenants, isLoading: isConsortiaTenantsLoading } = useConsortiaTenantsQuery();
  const tenantIds = consortiaTenants?.map(tenant => tenant.id);

  const { locationsFromAllTenants, isConsolidationLocationLoading } = useLocationsFromAllTenantsQuery({ tenantIds });
  const { locations, isLoading: isLocationsLoading } = useLocationsQuery({ enabled: !isConsortiaEnv(stripes) });
  const { materialTypes, isLoading: isMaterialTypesLoading } = useMaterialTypesQuery();
  const { natureOfContentTerms, isLoading: isNatureOfContentTermsLoading } = useNatureOfContentTermsQuery();
  const { holdingsTypes, isLoading: isHoldingsTypesLoading } = useHoldingsTypesQuery();
  const { statisticalCodeTypes, isLoading: isStatisticalCodeTypesLoading } = useStatisticalCodeTypesQuery();
  const { statisticalCodes, isLoading: isStatisticalCodesLoading } = useStatisticalCodesQuery();
  const { modesOfIssuance, isLoading: isModesOfIssuanceLoading } = useModesOfIssuanceQuery();
  const { instanceStatuses, isLoading: isInstanceStatusesLoading } = useInstanceStatusesQuery();
  const { instanceFormats, isLoading: isInstanceFormatsLoading } = useInstanceFormatsQuery();
  const { holdingsSources, isLoading: isHoldingsSourcesLoading } = useHoldingsSourcesQuery();
  const { instanceTypes, isLoading: isInstanceTypesLoading } = useInstanceTypesQuery();

  const isCommonDataLoading = isLocationsLoading || isConsortiaTenantsLoading || isInstanceTypesLoading
    || isConsolidationLocationLoading || isMaterialTypesLoading || isNatureOfContentTermsLoading
    || isHoldingsTypesLoading || isStatisticalCodesLoading || isModesOfIssuanceLoading || isInstanceStatusesLoading
    || isInstanceFormatsLoading || isHoldingsSourcesLoading || isStatisticalCodeTypesLoading;

  const commonData = useMemo(() => {
    const loadedData = {};

    if (isConsortiaEnv(stripes)) {
      loadedData.locations = locationsFromAllTenants;
      loadedData.consortiaTenants = consortiaTenants;
    } else {
      loadedData.locations = locations;
    }

    loadedData.locationsById = keyBy(loadedData.locations, 'id');
    loadedData.consortiaTenantsById = keyBy(consortiaTenants, 'id');
    const statisticalCodeTypesById = keyBy(statisticalCodeTypes, 'id');

    loadedData.statisticalCodes = statisticalCodes.map(sc => {
      sc.statisticalCodeType = statisticalCodeTypesById[sc.statisticalCodeTypeId];
      return sc;
    });
    loadedData.statisticalCodeTypes = statisticalCodeTypes;
    loadedData.materialTypes = materialTypes;
    loadedData.natureOfContentTerms = natureOfContentTerms;
    loadedData.holdingsTypes = holdingsTypes;
    loadedData.modesOfIssuance = modesOfIssuance;
    loadedData.instanceStatuses = instanceStatuses;
    loadedData.instanceFormats = instanceFormats;
    loadedData.holdingsSources = holdingsSources;
    loadedData.instanceTypes = instanceTypes;

    return loadedData;
  }, [
    locationsFromAllTenants,
    consortiaTenants,
    locations,
    statisticalCodeTypes,
    statisticalCodes,
    materialTypes,
    natureOfContentTerms,
    holdingsTypes,
    modesOfIssuance,
    instanceStatuses,
    instanceFormats,
    holdingsSources,
    instanceTypes,
  ]);

  return {
    commonData,
    isCommonDataLoading,
  };
};

export { useCommonData };
