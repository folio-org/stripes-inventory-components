import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  useOkapiKy,
  checkIfUserInCentralTenant,
} from '@folio/stripes/core';

import {
  renderHook,
  act,
} from '@folio/jest-config-stripes/testing-library/react';

import { useLocationsFromAllTenantsQuery } from './useLocationsFromAllTenantsQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useLocationsFromAllTenantsQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const consortiaTenants = [
    { id: 'tenant-id-1', name: 'College' },
    { id: 'tenant-id-2', name: 'Professional' },
    { id: 'tenant-id-3', name: 'School' },
  ];

  describe('when user is in a member tenant', () => {
    const mockGet = jest.fn().mockReturnValue({
      json: () => Promise.resolve({
        locations: [
          { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-1' },
          { id: 'location-id-2', name: 'name-2', tenantId: 'tenant-id-2' },
          { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-3' },
          { id: 'location-id-3', name: 'name-2', tenantId: 'tenant-id-3' },
        ],
      }),
    });

    describe('when a location id is unique', () => {
      it('should display tenant`s name in parentheses next to the location name', async () => {
        useOkapiKy.mockClear().mockReturnValue({
          get: mockGet,
        });

        const { result } = renderHook(() => useLocationsFromAllTenantsQuery({ consortiaTenants }), { wrapper });

        await act(() => !result.current.isLoading);

        expect(result.current.locationsFromAllTenants).toEqual([
          { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-1' },
          { id: 'location-id-2', name: 'name-2 (Professional)', tenantId: 'tenant-id-2' },
          { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-3' },
          { id: 'location-id-3', name: 'name-2 (School)', tenantId: 'tenant-id-3' },
        ]);
      });
    });

    it('should fetch locations of all tenants via consolidated endpoint', async () => {
      const { result } = renderHook(() => useLocationsFromAllTenantsQuery({ consortiaTenants }), { wrapper });

      await act(() => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/consortium/locations');

      expect(result.current.locationsFromAllTenants).toEqual([
        { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-1' },
        { id: 'location-id-2', name: 'name-2 (Professional)', tenantId: 'tenant-id-2' },
        { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-3' },
        { id: 'location-id-3', name: 'name-2 (School)', tenantId: 'tenant-id-3' },
      ]);
    });
  });

  describe('when user is in a central tenant', () => {
    const mockGet = jest.fn().mockReturnValue({
      json: () => Promise.resolve({
        locations: [
          { id: 'location-id', name: 'name-1', tenantId: 'tenant-id-1' },
        ],
      }),
    });

    beforeEach(() => {
      checkIfUserInCentralTenant.mockClear().mockReturnValue(true);

      useOkapiKy.mockClear().mockReturnValue({
        get: mockGet,
      });
    });

    it('should fetch locations of all tenants via consolidated endpoint', async () => {
      const { result } = renderHook(() => useLocationsFromAllTenantsQuery({ consortiaTenants }), { wrapper });

      await act(() => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/consortium/locations');

      expect(result.current.locationsFromAllTenants).toEqual([
        { id: 'location-id', name: 'name-1 (College)', tenantId: 'tenant-id-1' },
      ]);
    });

    describe('when a location id is unique', () => {
      it('should display tenant`s name in parentheses next to the location name', async () => {
        const locations = [
          { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-3' },
          { id: 'location-id-2', name: 'name-2', tenantId: 'tenant-id-1' },
          { id: 'location-id-3', name: 'name-1', tenantId: 'tenant-id-2' },
          { id: 'location-id-1', name: 'name-4', tenantId: 'tenant-id-4' },
        ];

        useOkapiKy.mockReturnValue({
          get: () => ({
            json: () => Promise.resolve({ locations }),
          })
        });

        const { result } = renderHook(() => useLocationsFromAllTenantsQuery({ consortiaTenants }), { wrapper });

        await act(() => !result.current.isLoading);

        expect(result.current.locationsFromAllTenants).toEqual([
          { id: 'location-id-1', name: 'name-1', tenantId: 'tenant-id-3' },
          { id: 'location-id-2', name: 'name-2 (College)', tenantId: 'tenant-id-1' },
          { id: 'location-id-3', name: 'name-1 (Professional)', tenantId: 'tenant-id-2' },
          { id: 'location-id-1', name: 'name-4', tenantId: 'tenant-id-4' },
        ]);
      });
    });
  });
});
