import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import { useCommonData } from './useCommonData';
import { isConsortiaEnv } from '../../utils';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  isConsortiaEnv: jest.fn(),
}));

jest.mock('../../queries', () => ({
  ...jest.requireActual('../../queries'),
  useConsortiaTenantsQuery: jest.fn().mockReturnValue({
    consortiaTenants: [{ id: 'cs00000int_0001', name: 'College' }],
    isLoading: false,
  }),
  useLocationsFromAllTenantsQuery: jest.fn().mockReturnValue({
    locationsFromAllTenants: [{ id: 'id-1', tenantId: 'cs00000int_0001' }],
    isLoading: false,
  }),
  useLocationsQuery: jest.fn().mockReturnValue({
    locations: [{ id: 'id-1', code: 'Migration' }],
    isLoading: false,
  }),
  useMaterialTypesQuery: jest.fn().mockReturnValue({
    materialTypes: [{ id: 'id-1', name: 'book' }],
    isLoading: false,
  }),
  useNatureOfContentTermsQuery: jest.fn().mockReturnValue({
    natureOfContentTerms: [{ id: 'id-1', name: 'audiobook' }],
    isLoading: false,
  }),
  useHoldingsTypesQuery: jest.fn().mockReturnValue({
    holdingsTypes: [{ id: 'id-1', name: 'Electronic' }],
    isLoading: false,
  }),
  useStatisticalCodesQuery: jest.fn().mockReturnValue({
    statisticalCodes: [{ id: 'id-1', statisticalCodeTypeId: '3abd6fc2-b3e4-4879-b1e1-78be41769fe3' }],
    isLoading: false,
  }),
  useModesOfIssuanceQuery: jest.fn().mockReturnValue({
    modesOfIssuance: [{ id: 'id-1', name: 'serial' }],
    isLoading: false,
  }),
  useInstanceStatusesQuery: jest.fn().mockReturnValue({
    instanceStatuses: [{ id: 'id-1', code: 'batch' }],
    isLoading: false,
  }),
  useInstanceFormatsQuery: jest.fn().mockReturnValue({
    instanceFormats: [{ id: 'id-1', code: 'sb' }],
    isLoading: false,
  }),
  useHoldingsSourcesQuery: jest.fn().mockReturnValue({
    holdingsSources: [{ id: 'id-1', name: 'FOLIO' }],
    isLoading: false,
  }),
  useInstanceTypesQuery: jest.fn().mockReturnValue({
    instanceTypes: [{ id: 'id-1', code: 'crd' }],
    isLoading: false,
  }),
  useStatisticalCodeTypesQuery: jest.fn().mockReturnValue({
    statisticalCodeTypes: [{ id: '3abd6fc2-b3e4-4879-b1e1-78be41769fe3', name: 'ARL (Collection stats)' }],
    isLoading: false,
  }),
}));

const commonData = {
  consortiaTenants: [{ id: 'cs00000int_0001', name: 'College' }],
  consortiaTenantsById: {
    cs00000int_0001: { id: 'cs00000int_0001', name: 'College' },
  },
  holdingsSources: [{ id: 'id-1', name: 'FOLIO' }],
  holdingsTypes: [{ id: 'id-1', name: 'Electronic' }],
  instanceFormats: [{ id: 'id-1', code: 'sb' }],
  instanceStatuses: [{ id: 'id-1', code: 'batch' }],
  instanceTypes: [{ id: 'id-1', code: 'crd' }],
  locations: [{ id: 'id-1', tenantId: 'cs00000int_0001' }],
  materialTypes: [{ id: 'id-1', name: 'book' }],
  modesOfIssuance: [{ id: 'id-1', name: 'serial' }],
  natureOfContentTerms: [{ id: 'id-1', name: 'audiobook' }],
  statisticalCodeTypes: [{ id: '3abd6fc2-b3e4-4879-b1e1-78be41769fe3', name: 'ARL (Collection stats)' }],
  statisticalCodes: [{
    id: 'id-1',
    statisticalCodeType: { id: '3abd6fc2-b3e4-4879-b1e1-78be41769fe3', name: 'ARL (Collection stats)' },
    statisticalCodeTypeId: '3abd6fc2-b3e4-4879-b1e1-78be41769fe3',
  }],
};

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useCommonData', () => {
  beforeEach(() => {
    isConsortiaEnv.mockClear();
  });

  describe('when consortia mode', () => {
    it('should return correct data', async () => {
      isConsortiaEnv.mockReturnValue(true);

      const { result } = renderHook(useCommonData, { wrapper });

      expect(result.current.commonData).toEqual(commonData);
    });
  });

  describe('when non-consortia mode', () => {
    it('should return correct data', async () => {
      isConsortiaEnv.mockReturnValue(false);

      const { result } = renderHook(useCommonData, { wrapper });

      expect(result.current.commonData).toEqual({
        ...commonData,
        consortiaTenants: undefined,
        locations: [{ id: 'id-1', code: 'Migration' }],
      });
    });
  });
});
