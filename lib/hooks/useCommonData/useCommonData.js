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

const useCommonData = (tenantId) => {
  const stripes = useStripes();

  const { consortiaTenants, isLoading: isConsortiaTenantsLoading } = useConsortiaTenantsQuery();
  const { locationsFromAllTenants, isConsolidationLocationLoading } = useLocationsFromAllTenantsQuery({ consortiaTenants, tenantId });
  const { locations, isLoading: isLocationsLoading } = useLocationsQuery({ enabled: !isConsortiaEnv(stripes), tenantId });
  const { materialTypes, isLoading: isMaterialTypesLoading } = useMaterialTypesQuery({ tenantId });
  const { natureOfContentTerms, isLoading: isNatureOfContentTermsLoading } = useNatureOfContentTermsQuery({ tenantId });
  const { holdingsTypes, isLoading: isHoldingsTypesLoading } = useHoldingsTypesQuery({ tenantId });
  const { statisticalCodeTypes, isLoading: isStatisticalCodeTypesLoading } = useStatisticalCodeTypesQuery({ tenantId });
  const { statisticalCodes, isLoading: isStatisticalCodesLoading } = useStatisticalCodesQuery({ tenantId });
  const { modesOfIssuance, isLoading: isModesOfIssuanceLoading } = useModesOfIssuanceQuery({ tenantId });
  const { instanceStatuses, isLoading: isInstanceStatusesLoading } = useInstanceStatusesQuery({ tenantId });
  const { instanceFormats, isLoading: isInstanceFormatsLoading } = useInstanceFormatsQuery({ tenantId });
  const { holdingsSources, isLoading: isHoldingsSourcesLoading } = useHoldingsSourcesQuery({ tenantId });
  const { instanceTypes, isLoading: isInstanceTypesLoading } = useInstanceTypesQuery({ tenantId });

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
