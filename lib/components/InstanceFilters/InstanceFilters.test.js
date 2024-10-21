import { BrowserRouter as Router } from 'react-router-dom';

import { ModuleHierarchyProvider } from '@folio/stripes/core';
import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import { InstanceFilters } from './InstanceFilters';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import {
  FACETS,
  segments,
} from '../../constants';
import { ResetProvider } from '../../contexts';

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
        <ResetProvider>
          <InstanceFilters
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

describe('InstanceFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should Clear selected filters for shared', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Shared filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.SHARED, values: [] });
    });
  });

  it('Should Clear selected filters for Held By', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Held by filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.HELD_BY, values: [] });
    });
  });

  it('Should Clear selected filters for effective Location', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Effective location (item) filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.EFFECTIVE_LOCATION, values: [] });
    });
  });

  it('Should Clear selected filters for language', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Language filters' });

    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.LANGUAGE, values: [] });
    });
  });

  it('Should Clear selected filters for resource', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Resource Type filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.RESOURCE, values: [] });
    });
  });

  it('Should Clear selected filters for format', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Format filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.FORMAT, values: [] });
    });
  });

  it('Should Clear selected filters for mode', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Mode of issuance filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.MODE, values: [] });
    });
  });

  it('Should Clear selected filters for nature Of Content', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Nature of content filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.NATURE_OF_CONTENT, values: [] });
    });
  });

  it('Should Clear selected filters for staffSuppress', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Staff suppress filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.STAFF_SUPPRESS, values: [] });
    });
  });

  it('Should Clear selected filters for Suppress from discovery', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Suppress from discovery filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.INSTANCES_DISCOVERY_SUPPRESS, values: [] });
    });
  });

  it('Should Clear selected filters for Statistical code filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Statistical code filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.STATISTICAL_CODE_IDS, values: [] });
    });
  });

  it('Should Clear selected filters for Date created filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Date created filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.CREATED_DATE, values: [] });
    });
  });

  it('Should Clear selected filters for Date updated filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Date updated filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.UPDATED_DATE, values: [] });
    });
  });

  it('Should Clear selected filters for Instance status filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Instance status filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.STATUS, values: [] });
    });
  });

  it('Should Clear selected filters for Source filter list', async () => {
    renderInstanceFilters();
    const Clearselectedfilters = screen.getByRole('button', { name: 'Clear selected Source filters' });
    userEvent.click(Clearselectedfilters);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({ name: FACETS.SOURCE, values: [] });
    });
  });
});
