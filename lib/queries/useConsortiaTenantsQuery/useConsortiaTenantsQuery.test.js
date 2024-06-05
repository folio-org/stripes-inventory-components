import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  act,
  renderHook,
} from '@folio/jest-config-stripes/testing-library/react';
import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

import { useConsortiaTenantsQuery } from './useConsortiaTenantsQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const response = {
  tenants: [{
    id: 'tenant-id',
  }],
};

const mockGet = jest.fn().mockReturnValue({
  json: jest.fn().mockResolvedValue(response),
});

describe('useConsortiaTenants', () => {
  beforeEach(() => {
    useStripes.mockClear();
    useOkapiKy.mockClear().mockReturnValue({
      get: mockGet,
    });
  });

  describe('when env is not consortia', () => {
    it('should not fetch tenants', async () => {
      useStripes.mockReturnValue({
        user: {
          user: {},
        },
      });

      const { result } = renderHook(() => useConsortiaTenantsQuery(), { wrapper });

      await act(() => !result.current.isLoading);

      expect(mockGet).not.toHaveBeenCalled();
    });
  });

  describe('when env is consortia', () => {
    it('should fetch tenants', async () => {
      const consortium = {
        centralTenantId: 'centralTenantId',
        id: 'id',
      };

      useStripes.mockReturnValue({
        user: {
          user: {
            consortium,
          },
        },
      });

      const { result } = renderHook(() => useConsortiaTenantsQuery(), { wrapper });

      await act(() => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('consortia/id/tenants?limit=1000');

      expect(result.current).toEqual({
        consortiaTenants: response.tenants,
        isLoading: false,
      });
    });
  });
});
