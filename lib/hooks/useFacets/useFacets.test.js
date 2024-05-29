import { useQueryClient } from 'react-query';

import { renderHook, act } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useFacets } from './useFacets';
import Harness from '../../../test/jest/helpers/Harness';
import { translationsProperties } from '../../../test/jest/helpers';
import {
  browseClassificationOptions,
  browseModeOptions,
  FACETS,
  FACETS_CQL,
  queryIndexes,
} from '../../constants';

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQueryClient: jest.fn(),
}));

const initialAccordionStates = {
  effectiveLocation: false,
  holdingsCreatedDate: false,
  tenantId: false,
  shared: false,
  staffSuppress: false,
  language: false,
};

const queryObj = {
  query: '',
  qindex: '',
  filters: '',
  segment: '',
  sort: 'title',
};

const filterConfig = {
  filters: [
    { name: 'shared', cql: 'shared', values: [] },
    { name: 'tenantId', cql: 'holdings.tenantId', values: [] },
    { name: 'effectiveLocation', cql: 'items.effectiveLocationId', values: [] },
    { name: 'staffSuppress', cql: 'staffSuppress', values: [] },
    { name: 'holdingsCreatedDate', cql: 'holdings.metadata.createdDate', values: [] },
    { name: 'language', cql: 'languages', values: [] },
  ],
  indexes: [
    {
      label: 'label-1',
      value: queryIndexes.INSTANCE_KEYWORD,
      queryTemplate: 'keyword all "%{query.query}"'
    }
  ],
};

const activeFilters = {
  staffSuppress: ['false'],
};

const locations = [
  {
    id: 'id-1',
    name: 'Annex',
  },
  {
    id: 'id-2',
    name: 'Main Library',
  },
];

const classificationBrowseConfig = [{
  id: 'lc',
  typeIds: ['type-1', 'type-2'],
}];

const data = {
  locations,
  classificationBrowseConfig,
};

const effectiveLocationResponse = {
  'items.effectiveLocationId': {
    totalRecords: 2,
    values: [{ id: 'id-1', totalRecords: 14 }, { id: 'id-2', totalRecords: 4 }],
  },
};
const sharedResponse = {
  shared: {
    totalRecords: 2,
    values: [{ id: 'true', totalRecords: 10 }, { id: 'false', totalRecords: 12 }],
  }
};
const staffSuppressResponse = {
  staffSuppress: {
    totalRecords: 2,
    values: [{ id: 'true', totalRecords: 7 }, { id: 'false', totalRecords: 8 }],
  }
};
const languagesResponse = {
  languages: {
    totalRecords: 2,
    values: [{ id: 'eng', totalRecords: 23 }, { id: 'pol', totalRecords: 24 }],
  }
};

const Wrapper = ({ children }) => <Harness translations={translationsProperties}>{children}</Harness>;

const json = jest.fn().mockResolvedValue({
  facets: [],
  totalRecords: 0,
});

const mockGet = jest.fn(() => ({
  json,
}));

const mockInvalidateQueries = jest.fn().mockResolvedValue();
const mockGetQueryCache = jest.fn(() => ({
  find: () => {},
}));

describe('useFacets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOkapiKy.mockReturnValue({
      get: mockGet,
    });
    useQueryClient.mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
      getQueryCache: mockGetQueryCache,
    });
  });

  describe('when user opens a facet', () => {
    it('should fetch only 6 options for this facet', async () => {
      json.mockResolvedValue({ facets: effectiveLocationResponse });

      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates,
          query: {
            ...queryObj,
            filters: 'staffSuppress.false',
          },
          filterConfig,
          activeFilters,
          data,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: 'effectiveLocation' }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
        searchParams: {
          facet: 'items.effectiveLocationId:6',
          query: 'staffSuppress=="false"',
        },
      });
      expect(result.current.accordionStatus).toEqual({
        effectiveLocation: true,
        holdingsCreatedDate: false,
        tenantId: false,
        shared: false,
        language: false,
        staffSuppress: false,
      });
      expect(result.current.facetOptions).toEqual({
        'items.effectiveLocationId': [{
          count: 14,
          label: 'Annex',
          value: 'id-1',
        }, {
          count: 4,
          label: 'Main Library',
          value: 'id-2',
        }],
        'holdings.metadata.createdDate': [],
        'holdings.tenantId': [],
        shared: [],
        languages: [],
        staffSuppress: [],
      });
    });
  });

  describe('when user clicks the "+More" button under options', () => {
    it('should fetch all options for this facet', async () => {
      json.mockResolvedValue({ facets: effectiveLocationResponse });

      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates,
          query: {
            ...queryObj,
            filters: 'staffSuppress.false',
          },
          filterConfig,
          activeFilters,
          data,
        },
        wrapper: Wrapper,
      });

      await act(async () => result.current.onToggleAccordion({ id: 'effectiveLocation' }));
      await act(async () => result.current.onInputFocusAndMoreClick({ name: 'effectiveLocation', isMoreClicked: true }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
        searchParams: {
          facet: 'items.effectiveLocationId',
          query: 'staffSuppress=="false"',
        },
      });
      expect(result.current.accordionStatus).toEqual({
        effectiveLocation: true,
        holdingsCreatedDate: false,
        tenantId: false,
        shared: false,
        language: false,
        staffSuppress: false,
      });
      expect(result.current.facetOptions).toEqual({
        'items.effectiveLocationId': [{
          count: 14,
          label: 'Annex',
          value: 'id-1',
        }, {
          count: 4,
          label: 'Main Library',
          value: 'id-2',
        }],
        'holdings.metadata.createdDate': [],
        'holdings.tenantId': [],
        shared: [],
        languages: [],
        staffSuppress: [],
      });
    });
  });

  describe('when user places the cursor in the facet`s input field', () => {
    it('should fetch all options for this facet', async () => {
      json.mockResolvedValue({ facets: effectiveLocationResponse });

      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates,
          query: {
            ...queryObj,
            filters: 'staffSuppress.false',
          },
          filterConfig,
          activeFilters,
          data,
        },
        wrapper: Wrapper,
      });

      await act(async () => result.current.onToggleAccordion({ id: 'effectiveLocation' }));
      await act(async () => result.current.onInputFocusAndMoreClick({ name: 'effectiveLocation', isFocused: true }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
        searchParams: {
          facet: 'items.effectiveLocationId',
          query: 'staffSuppress=="false"',
        },
      });
      expect(result.current.accordionStatus).toEqual({
        effectiveLocation: true,
        holdingsCreatedDate: false,
        tenantId: false,
        shared: false,
        language: false,
        staffSuppress: false,
      });
      expect(result.current.facetOptions).toEqual({
        'items.effectiveLocationId': [{
          count: 14,
          label: 'Annex',
          value: 'id-1',
        }, {
          count: 4,
          label: 'Main Library',
          value: 'id-2',
        }],
        'holdings.metadata.createdDate': [],
        'holdings.tenantId': [],
        shared: [],
        languages: [],
        staffSuppress: [],
      });
    });
  });

  describe('when several facets are open and user submits a value in the main search field', () => {
    it('should fetch options for all open facets', async () => {
      json.mockResolvedValue({ facets: effectiveLocationResponse })
        .mockResolvedValue({ facets: sharedResponse })
        .mockResolvedValue({ facets: staffSuppressResponse })
        .mockResolvedValue({ facets: languagesResponse })
        .mockResolvedValue({ facets: {
          ...effectiveLocationResponse,
          ...sharedResponse,
          ...staffSuppressResponse,
          ...languagesResponse,
        } });

      const props = {
        initialAccordionStates,
        query: {
          ...queryObj,
          filters: 'staffSuppress.false',
        },
        filterConfig,
        activeFilters,
        data,
      };

      const { result, rerender } = renderHook(useFacets, {
        initialProps: props,
        wrapper: Wrapper,
      });

      await act(async () => result.current.onToggleAccordion({ id: 'effectiveLocation' }));
      await act(async () => result.current.onToggleAccordion({ id: 'holdingsCreatedDate' }));
      await act(async () => result.current.onToggleAccordion({ id: 'shared' }));
      await act(async () => result.current.onToggleAccordion({ id: 'staffSuppress' }));
      await act(async () => result.current.onToggleAccordion({ id: 'language' }));
      await act(async () => result.current.onInputFocusAndMoreClick({ name: 'effectiveLocation', isFocused: true }));
      await act(async () => result.current.onInputFocusAndMoreClick({ name: 'language', isMoreClicked: true }));
      await act(async () => !result.current.isLoading);

      await act(async () => {
        rerender({
          ...props,
          query: {
            ...props.query,
            query: 'foo',
          },
        });
      });

      expect(mockGet).toHaveBeenLastCalledWith('search/instances/facets', {
        searchParams: {
          facet: 'items.effectiveLocationId:6,shared:6,staffSuppress,languages',
          query: '(keyword all "foo") and staffSuppress=="false"',
        },
      });
      expect(result.current.accordionStatus).toEqual({
        effectiveLocation: true,
        holdingsCreatedDate: true,
        tenantId: false,
        shared: true,
        staffSuppress: true,
        language: true,
      });
      expect(result.current.facetOptions).toEqual({
        'items.effectiveLocationId': [
          { count: 14, label: 'Annex', value: 'id-1' },
          { count: 4, label: 'Main Library', value: 'id-2' },
        ],
        'holdings.metadata.createdDate': [],
        'holdings.tenantId': [],
        shared: [
          { count: 10, label: expect.anything(), value: 'true' },
          { count: 12, label: expect.anything(), value: 'false' },
        ],
        languages: [
          { count: 23, label: '', value: 'eng' },
          { count: 24, label: '', value: 'pol' },
        ],
        staffSuppress: [
          { count: 7, label: expect.anything(), value: 'true' },
          { count: 8, label: expect.anything(), value: 'false' },
        ]
      });
    });
  });

  describe('when several facets are open and user selects an option of any facet', () => {
    it('should fetch options for all open facets', async () => {
      json.mockResolvedValue({ facets: effectiveLocationResponse })
        .mockResolvedValue({ facets: staffSuppressResponse })
        .mockResolvedValue({ facets: languagesResponse })
        .mockResolvedValue({ facets: { ...effectiveLocationResponse, ...staffSuppressResponse, ...languagesResponse } });

      const props = {
        initialAccordionStates,
        query: {
          ...queryObj,
          filters: 'staffSuppress.false',
        },
        filterConfig,
        activeFilters,
        data,
      };

      const { result, rerender } = renderHook(useFacets, {
        initialProps: props,
        wrapper: Wrapper,
      });

      await act(async () => result.current.onToggleAccordion({ id: 'effectiveLocation' }));
      await act(async () => result.current.onToggleAccordion({ id: 'staffSuppress' }));
      await act(async () => result.current.onToggleAccordion({ id: 'language' }));
      await act(async () => !result.current.isLoading);

      await act(async () => {
        rerender({
          ...props,
          activeFilters: {
            language: ['eng'],
            staffSuppress: ['false'],
          },
        });
      });

      expect(mockGet).toHaveBeenLastCalledWith('search/instances/facets', {
        searchParams: {
          facet: 'items.effectiveLocationId:6,staffSuppress,languages',
          query: 'staffSuppress=="false"',
        },
      });
      expect(result.current.accordionStatus).toEqual({
        effectiveLocation: true,
        holdingsCreatedDate: false,
        tenantId: false,
        shared: false,
        staffSuppress: true,
        language: true,
      });
      expect(result.current.facetOptions).toEqual({
        'items.effectiveLocationId': [
          { count: 14, label: 'Annex', value: 'id-1' },
          { count: 4, label: 'Main Library', value: 'id-2' },
        ],
        'holdings.metadata.createdDate': [],
        'holdings.tenantId': [],
        shared: [],
        languages: [
          { count: 23, label: '', value: 'eng' },
          { count: 24, label: '', value: 'pol' },
        ],
        staffSuppress: [
          { count: 7, label: expect.anything(), value: 'true' },
          { count: 8, label: expect.anything(), value: 'false' },
        ]
      });
    });
  });

  describe('when opening classification browse shared facet', () => {
    it('should make a request with correct search params', async () => {
      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates,
          query: {
            ...queryObj,
            qindex: browseClassificationOptions.LC_CLASSIFICATION,
          },
          filterConfig,
          activeFilters,
          data,
          isBrowseLookup: true,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/classifications/facets', {
        searchParams: {
          facet: `${FACETS_CQL.SHARED}:6`,
          query: '(cql.allRecords=1) and typeId==("type-1" or "type-2")',
        },
      });
    });
  });

  describe('when query contains sort parameter', () => {
    it('should remove the sort parameter from request', async () => {
      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates: {
            [FACETS.CONTRIBUTORS_SHARED]: false,
          },
          query: {
            ...queryObj,
            qindex: browseModeOptions.CONTRIBUTORS,
            sort: 'relevance',
          },
          filterConfig,
          activeFilters,
          data,
          isBrowseLookup: true,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.CONTRIBUTORS_SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/contributors/facets', {
        searchParams: {
          facet: `${FACETS_CQL.INSTANCES_SHARED}:6`,
          query: '(cql.allRecords=1)',
        },
      });
    });
  });
});
