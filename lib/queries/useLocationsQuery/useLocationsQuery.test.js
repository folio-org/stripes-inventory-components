import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import {
  renderHook,
  act,
} from '@folio/jest-config-stripes/testing-library/react';

import { useLocationsQuery } from './useLocationsQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useLocationsQuery', () => {
  beforeEach(() => {
    useOkapiKy.mockClear().mockReturnValue({
      get: () => ({
        json: () => Promise.resolve({ locations: [{ id: 'location-id' }] }),
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch locations', async () => {
    const { result } = renderHook(() => useLocationsQuery(), { wrapper });

    await act(() => !result.current.isLoading);

    expect(result.current.locations).toEqual([{ id: 'location-id' }]);
  });
});
