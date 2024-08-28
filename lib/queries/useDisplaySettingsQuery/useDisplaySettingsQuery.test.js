import { act } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useDisplaySettingsQuery } from './useDisplaySettingsQuery';
import { DEFAULT_SORT, SORT_OPTIONS } from '../../constants';

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useDisplaySettingsQuery', () => {
  it('should make a get request', async () => {
    const mockGet = jest.fn().mockReturnValue({
      json: jest.fn().mockResolvedValue({
        items: [{
          value: {
            defaultSort: SORT_OPTIONS.CONTRIBUTORS,
          },
        }],
      }),
    });

    useOkapiKy.mockClear().mockReturnValue({
      get: mockGet,
    });

    const { result } = renderHook(() => useDisplaySettingsQuery({ tenant: 'diku' }), { wrapper });

    expect(mockGet).toHaveBeenCalledWith('settings/entries', {
      searchParams: {
        query: 'key=="display-settings" and scope=="ui-inventory.display-settings"',
      },
    });

    expect(result.current.displaySettings).toEqual({
      defaultSort: DEFAULT_SORT,
    });

    await act(() => !result.current.isLoading);

    expect(result.current.displaySettings).toEqual({
      defaultSort: SORT_OPTIONS.CONTRIBUTORS,
    });
  });
});
