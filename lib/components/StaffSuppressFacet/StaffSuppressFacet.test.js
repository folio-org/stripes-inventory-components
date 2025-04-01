import { act, screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import { StaffSuppressFacet } from './StaffSuppressFacet';
import { FACETS } from '../../constants';
import { renderWithIntl } from '../../../test/jest/helpers';

const mockOnChange = jest.fn();

const renderStaffSuppressFacet = (props = {}) => renderWithIntl(
  <StaffSuppressFacet
    onChange={mockOnChange}
    accordionsStatus={{
      [FACETS.STAFF_SUPPRESS]: true,
    }}
    activeFilters={{}}
    name={FACETS.STAFF_SUPPRESS}
    facetOptions={{
      staffSuppress: [
        { label: 'option-1', value: 'false', count: 2 },
        { label: 'option-2', value: 'true', count: 3 },
      ],
    }}
    getIsLoading={() => false}
    onToggle={() => {}}
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
  });
});
