import { BrowserRouter as Router } from 'react-router-dom';
import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { ModuleHierarchyProvider } from '@folio/stripes/core';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import { ItemFilters } from './ItemFilters';
import { ResetProvider } from '../../contexts';
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
    'materialType.mt,itemsDiscoverySuppress.d,itemsStatisticalCodeIds.sc,itemsCreatedDate.1,itemsUpdatedDate.2,' +
    'itemsTags.test',
};

const onChange = jest.fn();

const renderItemFilters = () => {
  return renderWithIntl(
    <Router>
      <ModuleHierarchyProvider module="@folio/inventory">
        <ResetProvider>
          <ItemFilters
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

describe('ItemFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each([
    { name: FACETS.SHARED, heading: 'Shared' },
    { name: FACETS.HELD_BY, heading: 'Held by' },
    { name: FACETS.ITEM_STATUS, heading: 'Item status' },
    { name: FACETS.EFFECTIVE_LOCATION, heading: 'Effective location (item)' },
    { name: FACETS.HOLDINGS_PERMANENT_LOCATION, heading: 'Holdings permanent location' },
    { name: FACETS.MATERIAL_TYPE, heading: 'Material type' },
    { name: FACETS.ITEMS_DISCOVERY_SUPPRESS, heading: 'Suppress from discovery' },
    { name: FACETS.ITEMS_STATISTICAL_CODE_IDS, heading: 'Statistical code' },
    { name: FACETS.ITEMS_CREATED_DATE, heading: 'Date created' },
    { name: FACETS.ITEMS_UPDATED_DATE, heading: 'Date updated' },
    { name: FACETS.ITEMS_TAGS, heading: 'Tags' },
  ])('when pressing a clear button', ({ name, heading }) => {
    it('should call onChange with correct args', async () => {
      renderItemFilters();

      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();

      const clearButton = screen.getByRole('button', { name: `Clear selected ${heading} filters` });

      userEvent.click(clearButton);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith({ name, values: [] });
      });
    });
  });
});
