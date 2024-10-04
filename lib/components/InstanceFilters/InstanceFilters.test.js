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
import { useFacets } from '../../hooks';

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
  'instanceStatus.st,source.marc,instancesDiscoverySuppress.fake-sd,instancesTags.test',
};

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useFacets: jest.fn(jest.requireActual('../../hooks').useFacets),
}));

const onChange = jest.fn();

const renderInstanceFilters = () => {
  return renderWithIntl(
    <Router>
      <ModuleHierarchyProvider module="@folio/inventory">
        <InstanceFilters
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

describe('InstanceFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each([
    { name: FACETS.SHARED, heading: 'Shared' },
    { name: FACETS.HELD_BY, heading: 'Held by' },
    { name: FACETS.EFFECTIVE_LOCATION, heading: 'Effective location (item)' },
    { name: FACETS.LANGUAGE, heading: 'Language' },
    { name: FACETS.RESOURCE, heading: 'Resource Type' },
    { name: FACETS.FORMAT, heading: 'Format' },
    { name: FACETS.MODE, heading: 'Mode of issuance' },
    { name: FACETS.NATURE_OF_CONTENT, heading: 'Nature of content' },
    { name: FACETS.STAFF_SUPPRESS, heading: 'Staff suppress' },
    { name: FACETS.INSTANCES_DISCOVERY_SUPPRESS, heading: 'Suppress from discovery' },
    { name: FACETS.STATISTICAL_CODE_IDS, heading: 'Statistical code' },
    { name: FACETS.CREATED_DATE, heading: 'Date created' },
    { name: FACETS.UPDATED_DATE, heading: 'Date updated' },
    { name: FACETS.STATUS, heading: 'Instance status' },
    { name: FACETS.SOURCE, heading: 'Source' },
    { name: FACETS.INSTANCES_TAGS, heading: 'Tags' },
  ])('when pressing a clear button', ({ name, heading }) => {
    it('should call onChange with correct args', async () => {
      renderInstanceFilters();

      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();

      const clearButton = screen.getByRole('button', { name: `Clear selected ${heading} filters` });

      userEvent.click(clearButton);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith({ name, values: [] });
      });
    });
  });

  it('should not pass range filters to useFacets hook', () => {
    renderInstanceFilters();

    expect(useFacets).not.toHaveBeenCalledWith(expect.objectContaining({
      initialFacetStates: expect.objectContaining({
        [FACETS.DATE_RANGE]: expect.anything(),
      })
    }));

    expect(useFacets).not.toHaveBeenCalledWith(expect.objectContaining({
      initialFacetStates: expect.objectContaining({
        [FACETS.CREATED_DATE]: expect.anything(),
      })
    }));

    expect(useFacets).not.toHaveBeenCalledWith(expect.objectContaining({
      initialFacetStates: expect.objectContaining({
        [FACETS.UPDATED_DATE]: expect.anything(),
      })
    }));
  });
});
