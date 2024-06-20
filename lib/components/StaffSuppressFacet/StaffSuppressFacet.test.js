import { act, screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import { StaffSuppressFacet } from './StaffSuppressFacet';
import {
  FACETS,
  USER_TOUCHED_STAFF_SUPPRESS_STORAGE_KEY,
} from '../../constants';
import { renderWithIntl } from '../../../test/jest/helpers';

const mockOnChange = jest.fn();
const mockOnClear = jest.fn();

const renderStaffSuppressFacet = (props = {}) => renderWithIntl(
  <StaffSuppressFacet
    getIsLoading={() => false}
    onChange={mockOnChange}
    onClear={mockOnClear}
    activeFilters={{}}
    name={FACETS.STAFF_SUPPRESS}
    facetOptions={{
      staffSuppress: [
        { label: 'option-1', value: 'false', count: 2 },
        { label: 'option-2', value: 'true', count: 3 },
      ],
    }}
    {...props}
  />
);

describe('StaffSuppressFacet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when user selects staff suppress options', () => {
    const mockSetItem = jest.fn();
    beforeEach(() => {
      global.Storage.prototype.setItem = mockSetItem;
    });

    afterEach(() => {
      global.Storage.prototype.setItem.mockReset();
    });

    it('should set a flag that user selected some option', async () => {
      renderStaffSuppressFacet();

      const staffSuppressFacet = screen.getByRole('button', { name: 'Staff suppress filter list' });

      await act(() => userEvent.click(staffSuppressFacet));
      await act(() => userEvent.click(screen.getByText('option-1')));

      expect(mockSetItem).toHaveBeenCalledWith(USER_TOUCHED_STAFF_SUPPRESS_STORAGE_KEY, true);
    });
  });
});
