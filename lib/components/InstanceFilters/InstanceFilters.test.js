import { BrowserRouter as Router } from 'react-router-dom';

import { ModuleHierarchyProvider } from '@folio/stripes/core';
import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import { InstanceFilters } from './InstanceFilters';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import { FACETS } from '../../constants';

const data = {
  locations: [],
  resourceTypes: [],
  instanceFormats: [],
  modesOfIssuance: [],
  statisticalCodes: [],
  consortiaTenants: [],
  natureOfContentTerms: [],
};

const query = {
  filters: 'language.eng,shared.true,tenantId.id,effectiveLocation.l,language.eng,resource.r,format.f,mode.m,' +
  'natureOfContent.fake-n,staffSuppress.true,statisticalCodeIds.sc,createdDate.123,updatedDate.234,' +
  'instanceStatus.st,source.marc,instancesDiscoverySuppress.fake-sd',
};

const onChange = jest.fn();

const renderInstanceFilters = () => {
  return renderWithIntl(
    <Router>
      <ModuleHierarchyProvider module="@folio/inventory">
        <InstanceFilters
          data={data}
          query={query}
          onChange={onChange}
        />
      </ModuleHierarchyProvider>
    </Router>,
    translationsProperties
  );
};

describe('InstanceFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should Clear selected filters for shared', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Shared"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.SHARED, values: [] });
    });
  });

  it('Should Clear selected filters for Held By', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Held by"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HELD_BY, values: [] });
    });
  });

  it('Should Clear selected filters for effective Location', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Effective location (item)"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.EFFECTIVE_LOCATION, values: [] });
    });
  });

  it('Should Clear selected filters for language', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Language"' });

    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.LANGUAGE, values: [] });
    });
  });

  it('Should Clear selected filters for resource', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Resource Type"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.RESOURCE, values: [] });
    });
  });

  it('Should Clear selected filters for format', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Format"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.FORMAT, values: [] });
    });
  });

  it('Should Clear selected filters for mode', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Mode of issuance"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.MODE, values: [] });
    });
  });

  it('Should Clear selected filters for nature Of Content', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Nature of content"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.NATURE_OF_CONTENT, values: [] });
    });
  });

  it('Should Clear selected filters for staffSuppress', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Staff suppress"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.STAFF_SUPPRESS, values: [] });
    });
  });

  it('Should Clear selected filters for Suppress from discovery', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Suppress from discovery"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.INSTANCES_DISCOVERY_SUPPRESS, values: [] });
    });
  });

  it('Should Clear selected filters for Statistical code filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Statistical code"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.STATISTICAL_CODE_IDS, values: [] });
    });
  });

  it('Should Clear selected filters for Date created filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Date created"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.CREATED_DATE, values: [] });
    });
  });

  it('Should Clear selected filters for Date updated filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Date updated"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.UPDATED_DATE, values: [] });
    });
  });

  it('Should Clear selected filters for Instance status filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Instance status"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.STATUS, values: [] });
    });
  });

  it('Should Clear selected filters for Source filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected filters for "Source"' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.SOURCE, values: [] });
    });
  });
});
