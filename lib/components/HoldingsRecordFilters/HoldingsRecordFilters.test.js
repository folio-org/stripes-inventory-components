import { BrowserRouter as Router } from 'react-router-dom';

import { ModuleHierarchyProvider } from '@folio/stripes/core';
import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import { HoldingsRecordFilters } from './HoldingsRecordFilters';
import { ResetProvider } from '../../contexts';
import {
  FACETS,
  segments,
} from '../../constants';

const data = {
  locations: [],
  statisticalCodes: [],
  holdingsSources: [],
  holdingsTypes: [],
  resourceTypes: [],
  instanceFormats: [],
  modesOfIssuance: [],
  tagsRecords: [],
  natureOfContentTerms: [],
  consortiaTenants: [],
};

const query = {
  filters: 'language.eng,shared.true,tenantId.fake-tenant,effectiveLocation.fake-id,holdingsPermanentLocation.fake-loc,' +
    'holdingsType.fake-h,holdingsDiscoverySuppress.fake-hds,holdingsStatisticalCodeIds.fake-hsc,holdingsTags.test,' +
    'holdingsCreatedDate.2024-05-01:A2024-05-24,holdingsUpdatedDate.2024-05-01:A2024-05-24,holdingsSource.fake-source',
};

const onChange = jest.fn();

const renderHoldingsRecordFilters = () => {
  return renderWithIntl(
    <Router>
      <ModuleHierarchyProvider module="@folio/inventory">
        <ResetProvider>
          <HoldingsRecordFilters
            data={data}
            query={query}
            segment={segments.instances}
            onChange={onChange}
          />
        </ResetProvider>
      </ModuleHierarchyProvider>
    </Router>,
    translationsProperties
  );
};

describe('HoldingsRecordFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each([
    { name: FACETS.SHARED, heading: 'Shared' },
    { name: FACETS.HELD_BY, heading: 'Held by' },
    { name: FACETS.EFFECTIVE_LOCATION, heading: 'Effective location (item)' },
    { name: FACETS.HOLDINGS_PERMANENT_LOCATION, heading: 'Holdings permanent location' },
    { name: FACETS.HOLDINGS_TYPE, heading: 'Holdings type' },
    { name: FACETS.HOLDINGS_DISCOVERY_SUPPRESS, heading: 'Suppress from discovery' },
    { name: FACETS.HOLDINGS_STATISTICAL_CODE_IDS, heading: 'Statistical code' },
    { name: FACETS.HOLDINGS_CREATED_DATE, heading: 'Date created' },
    { name: FACETS.HOLDINGS_UPDATED_DATE, heading: 'Date updated' },
    { name: FACETS.HOLDINGS_SOURCE, heading: 'Source' },
    { name: FACETS.HOLDINGS_TAGS, heading: 'Tags' },
  ])('when pressing a clear button', ({ name, heading }) => {
    it('should call onChange with correct args', async () => {
      renderHoldingsRecordFilters();

      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();

      const clearButton = screen.getByRole('button', { name: `Clear selected ${heading} filters` });

      userEvent.click(clearButton);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith({ name, values: [] });
      });
    });
  });
});
