import { BrowserRouter as Router } from 'react-router-dom';
import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { ModuleHierarchyProvider } from '@folio/stripes/core';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import { ItemFilters } from './ItemFilters';
import {
  FACETS,
  segments,
} from '../../constants';

const data = {
  locations: [],
  resourceTypes: [],
  instanceFormats: [],
  modesOfIssuance: [],
  statisticalCodes: [],
  tagsRecords: [],
  natureOfContentTerms: [],
  consortiaTenants: [],
};

const query = {
  filters: 'language.eng,shared.true,tenantId.id,itemStatus.i,effectiveLocation.l,holdingsPermanentLocation.pl,' +
    'materialType.mt,itemsDiscoverySuppress.d,itemsStatisticalCodeIds.sc,itemsCreatedDate.1,itemsUpdatedDate.2',
};

const onChange = jest.fn();

const renderItemFilters = () => {
  return renderWithIntl(
    <Router>
      <ModuleHierarchyProvider module="@folio/inventory">
        <ItemFilters
          data={data}
          query={query}
          segment={segments.instances}
          onChange={onChange}
        />
      </ModuleHierarchyProvider>
    </Router>,
    translationsProperties
  );
};

describe('ItemFilters', () => {
  beforeEach(() => {
    renderItemFilters();
    jest.clearAllMocks();
  });

  it('Should Clear selected filters for shared', async () => {
    expect(screen.getByText('Shared')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[1]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.SHARED, values: [] });
    });
  });

  it('Should Clear selected filters for Held by', async () => {
    expect(screen.getByText('Held by')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[3]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HELD_BY, values: [] });
    });
  });

  it('Should Clear selected filters for itemStatus', async () => {
    expect(screen.getByText('Item status')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[5]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.ITEM_STATUS, values: [] });
    });
  });

  it('Should Clear selected filters for effectiveLocation', async () => {
    expect(screen.getByText('Effective location (item)')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[7]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.EFFECTIVE_LOCATION, values: [] });
    });
  });

  it('Should Clear selected filters for holdingsPermanentLocation', async () => {
    expect(screen.getByText('Holdings permanent location')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[9]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HOLDINGS_PERMANENT_LOCATION, values: [] });
    });
  });

  it('Should Clear selected filters for materialType', async () => {
    expect(screen.getByText('Material type')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[11]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.MATERIAL_TYPE, values: [] });
    });
  });

  it('Should Clear selected filters for itemsDiscoverySuppress', async () => {
    expect(screen.getByText('Suppress from discovery')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[13]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.ITEMS_DISCOVERY_SUPPRESS, values: [] });
    });
  });

  it('Should Clear selected filters for itemsStatisticalCodeIds', async () => {
    expect(screen.getByText('Statistical code')).toBeInTheDocument();
    const Clearselectedfilters = screen.getAllByRole('button');
    userEvent.click(Clearselectedfilters[15]);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.ITEMS_STATISTICAL_CODE_IDS, values: [] });
    });
  });

  it('Should Clear selected filters for items Created Date', async () => {
    expect(screen.getByText('Date created')).toBeInTheDocument();
    const clearButton = screen.getByRole('button', { name: 'Clear selected Date created filters' });

    userEvent.click(clearButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.ITEMS_CREATED_DATE, values: [] });
    });
  });

  it('Should Clear selected filters for itemsUpdatedDate', async () => {
    expect(screen.getByText('Date updated')).toBeInTheDocument();
    const clearButton = screen.getByRole('button', { name: 'Clear selected Date updated filters' });

    userEvent.click(clearButton);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.ITEMS_UPDATED_DATE, values: [] });
    });
  });
});
