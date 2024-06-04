import { useQueryClient } from 'react-query';

import { renderHook, act } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useFacets } from './useFacets';
import Harness from '../../../test/jest/helpers/Harness';
import { translationsProperties } from '../../../test/jest/helpers';
import {
  browseCallNumberOptions,
  browseClassificationOptions,
  browseModeOptions,
  FACETS,
  FACETS_CQL,
  queryIndexes,
} from '../../constants';
import {
  filterConfigMap,
  queryIndexesMap,
} from '../../filterConfig';

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
  sort: '',
};

const filterConfig = {
  filters: Object.values(filterConfigMap),
  indexes: [
    queryIndexesMap[queryIndexes.INSTANCE_KEYWORD],
  ],
};

const activeFilters = {};

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
          activeFilters: {
            [FACETS.STAFF_SUPPRESS]: ['false'],
          },
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
          activeFilters: {
            [FACETS.STAFF_SUPPRESS]: ['false'],
          },
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
          activeFilters: {
            [FACETS.STAFF_SUPPRESS]: ['false'],
          },
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
        activeFilters: {
          [FACETS.STAFF_SUPPRESS]: ['false'],
        },
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
          query: '(keyword all "foo" or isbn="foo" or hrid=="foo" or id=="foo") and staffSuppress=="false"',
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
        activeFilters: {
          [FACETS.STAFF_SUPPRESS]: ['false'],
        },
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
            [FACETS.LANGUAGE]: ['eng'],
            [FACETS.STAFF_SUPPRESS]: ['false'],
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

  describe('when opening a contributors shared facet', () => {
    describe('and there are no selected options in other facets', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.CONTRIBUTORS_SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseModeOptions.CONTRIBUTORS,
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

    describe('and there is a selected option in another facet', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.CONTRIBUTORS_SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseModeOptions.CONTRIBUTORS,
              [FACETS.CONTRIBUTORS_HELD_BY]: ['college'],
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
            query: 'instances.tenantId==("college")',
          },
        });
      });
    });
  });

  describe('when opening a subjects shared facet', () => {
    describe('and there are no selected options in other facets', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.SUBJECTS_SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseModeOptions.SUBJECTS,
            },
            filterConfig,
            activeFilters,
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SUBJECTS_SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/subjects/facets', {
          searchParams: {
            facet: `${FACETS_CQL.INSTANCES_SHARED}:6`,
            query: '(cql.allRecords=1)',
          },
        });
      });

      describe('and there is a selected option in another facet', () => {
        it('should make a request with correct request options', async () => {
          const { result } = renderHook(useFacets, {
            initialProps: {
              initialAccordionStates: {
                [FACETS.SUBJECTS_SHARED]: false,
              },
              query: {
                ...queryObj,
                qindex: browseModeOptions.SUBJECTS,
                [FACETS.CONTRIBUTORS_HELD_BY]: ['college'],
              },
              filterConfig,
              activeFilters,
              data,
              isBrowseLookup: true,
            },
            wrapper: Wrapper,
          });

          act(() => result.current.onToggleAccordion({ id: FACETS.SUBJECTS_SHARED }));
          await act(async () => !result.current.isLoading);

          expect(mockGet).toHaveBeenCalledWith('search/subjects/facets', {
            searchParams: {
              facet: `${FACETS_CQL.INSTANCES_SHARED}:6`,
              query: 'instances.tenantId==("college")',
            },
          });
        });
      });
    });
  });

  describe('when opening call numbers browse shared facet', () => {
    describe('and there are no selected options in other facets', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseCallNumberOptions.CALL_NUMBERS,
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

        expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
          searchParams: {
            facet: `${FACETS_CQL.SHARED}:6`,
            query: '(items.effectiveShelvingOrder="" NOT items.effectiveShelvingOrder=="")',
          },
        });
      });
    });

    describe('and there is a selected option in another facet', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseCallNumberOptions.CALL_NUMBERS,
              [FACETS.CONTRIBUTORS_HELD_BY]: ['college'],
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

        expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
          searchParams: {
            facet: `${FACETS_CQL.SHARED}:6`,
            query: '(items.effectiveShelvingOrder="" NOT items.effectiveShelvingOrder=="") and instances.tenantId==("college")',
          },
        });
      });
    });
  });

  describe('when opening call numbers sub-type browse shared facet', () => {
    describe('and there are no selected options in other facets', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseCallNumberOptions.DEWEY,
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

        expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
          searchParams: {
            facet: `${FACETS_CQL.SHARED}:6`,
            query: '(callNumberType="dewey" and items.effectiveShelvingOrder="" NOT items.effectiveShelvingOrder=="")',
          },
        });
      });
    });

    describe('and there is a selected option in another facet', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: browseCallNumberOptions.DEWEY,
              [FACETS.CONTRIBUTORS_HELD_BY]: ['college'],
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

        expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
          searchParams: {
            facet: `${FACETS_CQL.SHARED}:6`,
            query: '(callNumberType="dewey" and items.effectiveShelvingOrder="" NOT items.effectiveShelvingOrder=="") and instances.tenantId==("college")',
          },
        });
      });
    });
  });

  describe('when Advanced search is used', () => {
    it('should fetch facets with the correct params', async () => {
      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates: {
            [FACETS.SHARED]: false,
          },
          query: {
            ...queryObj,
            qindex: queryIndexes.ADVANCED_SEARCH,
            query: 'isbn containsAll test1 or title exactPhrase test2 or keyword startsWith test3',
          },
          filterConfig,
          activeFilters,
          data,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
        searchParams: {
          facet: `${FACETS_CQL.SHARED}:6`,
          query: 'isbn="*test1*" or title=="test2" or keyword all "test3*"',
        },
      });
    });
  });

  describe('when user has staff suppress facet permission', () => {
    it('should not apply staffSuppress.false facet by default', async () => {
      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates: {
            [FACETS.SHARED]: false,
          },
          query: {},
          filterConfig,
          activeFilters,
          data,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
        searchParams: {
          facet: `${FACETS_CQL.SHARED}:6`,
          query: 'id=*',
        },
      });
    });
  });

  describe('when Contributor search option is selected', () => {
    describe('and the `selectedBrowseResult` parameter is true', () => {
      it('should make a request with correct request options', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates: {
              [FACETS.SHARED]: false,
            },
            query: {
              ...queryObj,
              qindex: queryIndexes.CONTRIBUTOR,
              query: 'test',
              filters: 'searchContributors.2b4007a7-2d96-4262-a360-c9f760e355c3',
              selectedBrowseResult: 'true',
            },
            filterConfig,
            activeFilters,
            data,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/instances/facets', {
          searchParams: {
            facet: `${FACETS_CQL.SHARED}:6`,
            query: '(contributors.name==/string "test") and contributors.contributorNameTypeId=="2b4007a7-2d96-4262-a360-c9f760e355c3"',
          },
        });
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
