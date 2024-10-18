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
    'holdingsType.fake-h,holdingsDiscoverySuppress.fake-hds,holdingsStatisticalCodeIds.fake-hsc,' +
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

  it('Should Render shared, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const shared = screen.getByRole('button', { name: 'Shared filter list' });
    userEvent.click(shared);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[1]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.SHARED, values: [] });
    });
  });

  it('Should Render Held by, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const heldBy = screen.getByRole('button', { name: 'Held by filter list' });
    userEvent.click(heldBy);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[3]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HELD_BY, values: [] });
    });
  });

  it('Should Render effectiveLocation, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const effectiveLocation = screen.getByRole('button', { name: 'Effective location (item) filter list' });
    userEvent.click(effectiveLocation);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[5]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.EFFECTIVE_LOCATION, values: [] });
    });
  });

  it('Should Render holdingsPermanentLocation, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsPermanentLocation = screen.getByRole('button', { name: 'Holdings permanent location filter list' });
    userEvent.click(holdingsPermanentLocation);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[7]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_PERMANENT_LOCATION, values: [] });
    });
  });

  it('Should Render holdingsType, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsType = screen.getByRole('button', { name: 'Holdings type filter list' });
    userEvent.click(holdingsType);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[9]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_TYPE, values: [] });
    });
  });

  it('Should Render holdingsDiscoverySuppress, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsDiscoverySuppress = screen.getByRole('button', { name: 'Suppress from discovery filter list' });
    userEvent.click(holdingsDiscoverySuppress);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[11]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_DISCOVERY_SUPPRESS, values: [] });
    });
  });

  it('Should Render holdingsStatisticalCodeIds, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsStatisticalCodeIds = screen.getByRole('button', { name: 'Statistical code filter list' });
    userEvent.click(holdingsStatisticalCodeIds);
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[13]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_STATISTICAL_CODE_IDS, values: [] });
    });
  });

  it('Should Render holdingsCreatedDate, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsCreatedDate = screen.getByRole('button', { name: 'Date created filter list' });
    userEvent.click(holdingsCreatedDate);
    const clearButton = screen.getByRole('button', { name: 'Clear selected Date created filters' });

    userEvent.click(clearButton);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_CREATED_DATE, values: [] });
    });
  });

  it('Should Render holdingsUpdatedDate, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsUpdatedDate = screen.getByRole('button', { name: 'Date updated filter list' });
    userEvent.click(holdingsUpdatedDate);
    userEvent.click(screen.getByRole('button', { name: 'Clear selected Date updated filters' }));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_UPDATED_DATE, values: [] });
    });
  });

  it('Should Render holdingsSource, Clear selectedfilters buttons', async () => {
    renderHoldingsRecordFilters();
    const holdingsSource = screen.getByRole('button', { name: 'Source filter list' });
    userEvent.click(holdingsSource);
    userEvent.click(screen.getByRole('button', { name: 'Clear selected Source filters' }));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_SOURCE, values: [] });
    });
  });
});
