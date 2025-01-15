import { renderHook, act } from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useFacets } from './useFacets';
import Harness from '../../../test/jest/helpers/Harness';
import {
  browseCallNumberOptions,
  browseClassificationOptions,
  browseModeOptions,
  FACETS,
  FACETS_CQL,
  queryIndexes,
  segments,
} from '../../constants';

const initialAccordionStates = {
  effectiveLocation: false,
  tenantId: false,
  shared: false,
  staffSuppress: false,
  language: false,
};

const queryObj = {
  query: '',
  qindex: '',
  filters: '',
  sort: '',
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
}, {
  id: 'dewey',
  typeIds: [],
}];

const data = {
  locations,
  classificationBrowseConfig,
};

const effectiveLocationResponse = {
  'instances.locationId': {
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

const Wrapper = ({ children }) => <Harness translations={[]}>{children}</Harness>;

const json = jest.fn().mockResolvedValue({
  facets: [],
  totalRecords: 0,
});

const mockGet = jest.fn(() => ({
  json,
}));

describe('useFacets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOkapiKy.mockReturnValue({
      get: mockGet,
    });
  });

  describe('when opening a facet', () => {
    it('should fetch its options', async () => {
      json.mockResolvedValue({ facets: effectiveLocationResponse });

      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates: {
            effectiveLocation: false,
          },
          query: queryObj,
          segment: segments.holdings,
          data,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: 'effectiveLocation' }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
        searchParams: {
          facet: 'instances.locationId',
          query: 'id=*',
        },
      });

      expect(result.current.activeFilters).toEqual({});

      expect(result.current.accordionsStatus).toEqual({
        effectiveLocation: true,
      });
      expect(result.current.facetOptions).toEqual({
        'instances.locationId': [{
          count: 14,
          label: 'Annex',
          value: 'id-1',
        }, {
          count: 4,
          label: 'Main Library',
          value: 'id-2',
        }],
      });
    });
  });

  describe('when options are selected in different facets and more facets are opened', () => {
    it('should respect all of them', async () => {
      json.mockResolvedValue({
        facets: {
          ...effectiveLocationResponse,
          ...staffSuppressResponse,
          ...languagesResponse,
          ...sharedResponse,
        }
      });

      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates: {
            effectiveLocation: true,
            staffSuppress: true,
            shared: false,
            language: false,
          },
          query: {
            qindex: 'isbn',
            query: 'test',
            sort: 'title',
            filters: 'staffSuppress.false,effectiveLocation.id-1',
          },
          segment: segments.instances,
          data,
        },
        wrapper: Wrapper,
      });

      await act(async () => result.current.onToggleAccordion({ id: 'shared' }));
      await act(async () => result.current.onToggleAccordion({ id: 'language' }));

      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenLastCalledWith('search/call-numbers/facets', {
        searchParams: {
          facet: 'instances.locationId,staffSuppress,shared,languages',
          query: '(isbn="test") and staffSuppress=="false" and instances.locationId=="id-1"',
        },
      });
      expect(result.current.activeFilters).toEqual({
        effectiveLocation: ['id-1'],
        staffSuppress: ['false'],
      });
      expect(result.current.accordionsStatus).toEqual({
        effectiveLocation: true,
        staffSuppress: true,
        language: true,
        shared: true,
      });
      expect(result.current.facetOptions).toEqual({
        'instances.locationId': [
          { count: 14, label: 'Annex', value: 'id-1' },
          { count: 4, label: 'Main Library', value: 'id-2' },
        ],
        staffSuppress: [
          { count: 7, label: expect.anything(), value: 'true' },
          { count: 8, label: expect.anything(), value: 'false' },
        ],
        shared: [
          { count: 10, label: expect.anything(), value: 'true' },
          { count: 12, label: expect.anything(), value: 'false' },
        ],
        languages: [
          { count: 23, label: '', value: 'eng' },
          { count: 24, label: '', value: 'pol' },
        ],
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
          query: {
            ...queryObj,
            filters: 'staffSuppress.false,language.eng',
          },
        });
      });

      expect(mockGet).toHaveBeenLastCalledWith('search/call-numbers/facets', {
        searchParams: {
          facet: 'instances.locationId,staffSuppress,languages',
          query: 'staffSuppress=="false" and languages=="eng"',
        },
      });
      expect(result.current.activeFilters).toEqual({
        staffSuppress: ['false'],
        language: ['eng'],
      });
      expect(result.current.accordionsStatus).toEqual({
        effectiveLocation: true,
        tenantId: false,
        shared: false,
        staffSuppress: true,
        language: true,
      });
      expect(result.current.facetOptions).toEqual({
        'instances.locationId': [
          { count: 14, label: 'Annex', value: 'id-1' },
          { count: 4, label: 'Main Library', value: 'id-2' },
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.CONTRIBUTORS_SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/contributors/facets', {
          searchParams: {
            facet: FACETS_CQL.INSTANCES_SHARED,
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.CONTRIBUTORS_SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/contributors/facets', {
          searchParams: {
            facet: FACETS_CQL.INSTANCES_SHARED,
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SUBJECTS_SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/subjects/facets', {
          searchParams: {
            facet: FACETS_CQL.INSTANCES_SHARED,
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
              data,
              isBrowseLookup: true,
            },
            wrapper: Wrapper,
          });

          act(() => result.current.onToggleAccordion({ id: FACETS.SUBJECTS_SHARED }));
          await act(async () => !result.current.isLoading);

          expect(mockGet).toHaveBeenCalledWith('search/subjects/facets', {
            searchParams: {
              facet: FACETS_CQL.INSTANCES_SHARED,
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(callNumberTypeId=="all")',
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(callNumberTypeId=="all") and instances.tenantId==("college")',
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(callNumberTypeId=="dewey")',
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
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(callNumberTypeId=="dewey") and instances.tenantId==("college")',
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
          data,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
        searchParams: {
          facet: FACETS_CQL.SHARED,
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
          data,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
        searchParams: {
          facet: FACETS_CQL.SHARED,
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
            data,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/call-numbers/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(contributors.name==/string "test") and contributors.contributorNameTypeId=="2b4007a7-2d96-4262-a360-c9f760e355c3"',
          },
        });
      });
    });
  });

  describe('when opening classification browse shared facet', () => {
    describe('when Classification Browse has assigned types', () => {
      it('should make a request with correct search params', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates,
            query: {
              ...queryObj,
              qindex: browseClassificationOptions.LC_CLASSIFICATION,
            },
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: FACETS.SHARED }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/classifications/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(cql.allRecords=1) and typeId==("type-1" or "type-2")',
          },
        });
      });
    });

    describe('when Classification Browse does not have assigned types', () => {
      it('should make a request without typeId param', async () => {
        const { result } = renderHook(useFacets, {
          initialProps: {
            initialAccordionStates,
            query: {
              ...queryObj,
              qindex: browseClassificationOptions.DEWEY_CLASSIFICATION,
            },
            data,
            isBrowseLookup: true,
          },
          wrapper: Wrapper,
        });

        act(() => result.current.onToggleAccordion({ id: 'shared' }));
        await act(async () => !result.current.isLoading);

        expect(mockGet).toHaveBeenCalledWith('search/classifications/facets', {
          searchParams: {
            facet: FACETS_CQL.SHARED,
            query: '(cql.allRecords=1)',
          },
        });
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
          data,
          isBrowseLookup: true,
        },
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.CONTRIBUTORS_SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/contributors/facets', {
        searchParams: {
          facet: FACETS_CQL.INSTANCES_SHARED,
          query: '(cql.allRecords=1)',
        },
      });
    });
  });

  describe('when there are open facets', () => {
    it('should not make a request after closing the facet', async () => {
      const { result } = renderHook(useFacets, {
        initialProps: {
          initialAccordionStates: {
            [FACETS.LANGUAGE]: true,
            [FACETS.FORMAT]: true,
          },
          query: queryObj,
          data,
        },
        wrapper: Wrapper,
      });

      await act(async () => result.current.onToggleAccordion({ id: FACETS.FORMAT }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledTimes(1);
    });
  });

  describe('when switching between Browse search options and open the same facet', () => {
    it('should make a request with correct search params', async () => {
      const props = {
        initialAccordionStates: {
          [FACETS.CONTRIBUTORS_SHARED]: false,
          [FACETS.SUBJECTS_SHARED]: false,
        },
        query: {
          ...queryObj,
          qindex: browseModeOptions.CONTRIBUTORS,
          sort: 'relevance',
        },
        data,
        isBrowseLookup: true,
      };

      const { result, rerender } = renderHook(useFacets, {
        initialProps: props,
        wrapper: Wrapper,
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.CONTRIBUTORS_SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/contributors/facets', {
        searchParams: {
          facet: FACETS_CQL.INSTANCES_SHARED,
          query: '(cql.allRecords=1)',
        },
      });

      await act(async () => {
        rerender({
          ...props,
          query: {
            ...props.query,
            qindex: browseModeOptions.SUBJECTS,
          },
        });
      });

      act(() => result.current.onToggleAccordion({ id: FACETS.SUBJECTS_SHARED }));
      await act(async () => !result.current.isLoading);

      expect(mockGet).toHaveBeenCalledWith('search/subjects/facets', {
        searchParams: {
          facet: FACETS_CQL.INSTANCES_SHARED,
          query: '(cql.allRecords=1)',
        },
      });
    });
  });
});
