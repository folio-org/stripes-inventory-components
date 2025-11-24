import noop from 'lodash/noop';

import { buildSearchQuery } from './buildSearchQuery';
import { queryIndexes } from '../constants';
import buildStripes from '../../test/jest/__mock__/stripesCore.mock';

const mockReplaceRequestUrlQuery = jest.fn();

const defaultProps = {
  stripes: buildStripes(),
  mutator: {
    requestUrlQuery: { replace: mockReplaceRequestUrlQuery },
  },
};

const getBuildQueryArgs = ({
  queryParams = {},
  pathComponents = {},
  resourceData = {},
  logger = { log: jest.fn() },
  props = defaultProps,
} = {}) => {
  const resData = { query: { ...queryParams }, ...resourceData };

  return [queryParams, pathComponents, resData, logger, props];
};

const defaultQueryParamsMap = {
  [queryIndexes.ISBN]: { qindex: queryIndexes.ISBN, query: 'Some ISBN query' },
  [queryIndexes.CONTRIBUTOR]: { qindex: queryIndexes.CONTRIBUTOR, query: 'Some "contributor" query' },
  [queryIndexes.SUBJECT]: { qindex: queryIndexes.SUBJECT, query: 'Some "subject" query' },
};

describe('buildSearchQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('build query for inventory search', () => {
    it('should build query for \'Contributor\' search option', () => {
      const qindex = queryIndexes.CONTRIBUTOR;
      const queryParams = { ...defaultQueryParamsMap[qindex] };
      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

      expect(cql).toContain('(contributors.name="Some \\"contributor\\" query")');
    });

    describe('\'Subject\' search option', () => {
      describe('when a record is not linked with an authority record', () => {
        it('should build query without the authorityId', () => {
          const qindex = queryIndexes.SUBJECT;
          const queryParams = { ...defaultQueryParamsMap[qindex] };
          const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

          expect(cql).toEqual('(subjects.value==/string "Some \\"subject\\" query") sortby title');
        });
      });

      describe('when a record is linked with an authority record', () => {
        it('should build query with the authorityId', () => {
          const qindex = queryIndexes.SUBJECT;
          const queryParams = {
            ...defaultQueryParamsMap[qindex],
            filters: 'authorityId.37c01934-37c3-4874-a992-3912fcf526db',
          };
          const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

          expect(cql).toContain(
            '(subjects.value==/string "Some \\"subject\\" query") and authorityId=="37c01934-37c3-4874-a992-3912fcf526db")'
          );
        });
      });
    });

    describe('Advanced search option', () => {
      it('should build query with correct format', () => {
        const qindex = queryIndexes.ADVANCED_SEARCH;
        const queryParams = {
          qindex,
          query: 'keyword containsAll test or title exactPhrase hello',
        };
        const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

        expect(cql).toContain(
          '(keyword all "test" or title=="hello")'
        );
      });

      describe('when not valid query is passed', () => {
        it('should use keyword search', () => {
          const qindex = queryIndexes.ADVANCED_SEARCH;
          const queryParams = {
            qindex,
            query: 'keyword containsAll test or invalidOption exactPhrase hello',
          };
          const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

          expect(cql).toContain(
            '(keyword all "test")'
          );
        });
      });

      describe('when a search option is "Classification, normalized"', () => {
        describe('and match option is containsAny', () => {
          it('should build correct query', () => {
            const queryParams = {
              qindex: queryIndexes.ADVANCED_SEARCH,
              query: 'normalizedClassificationNumber containsAny test1 test2',
            };
            const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

            expect(cql).toContain(
              '(normalizedClassificationNumber any "*test1*" or normalizedClassificationNumber any "*test2*")'
            );
          });
        });
      });
    });
  });

  describe('build query based on selected browse record', () => {
    it('should build query for \'Call numbers\' browse option', () => {
      const qindex = queryIndexes.ISBN;
      const queryParams = {
        ...defaultQueryParamsMap[qindex],
        selectedBrowseResult: true,
      };
      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

      expect(cql).toEqual(expect.stringContaining(`isbn="${defaultQueryParamsMap[qindex].query}"`));
    });

    it('should build query for \'Contributors\' browse option', () => {
      const qindex = queryIndexes.CONTRIBUTOR;
      const queryParams = {
        ...defaultQueryParamsMap[qindex],
        selectedBrowseResult: true,
      };
      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

      expect(cql).toContain('(contributors.name==/string "Some \\"contributor\\" query")');
    });

    it('should build query for \'Subjects\' browse option', () => {
      const qindex = queryIndexes.SUBJECT;
      const queryParams = {
        ...defaultQueryParamsMap[qindex],
        selectedBrowseResult: true,
      };
      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

      expect(cql).toContain('(subjects.value==/string "Some \\"subject\\" query")');
    });
  });

  describe('inventory app', () => {
    it('should use qindex from queryParams', () => {
      const queryParams = {
        query: 'foo',
        qindex: queryIndexes.TITLE,
        filters: 'staffSuppress.false',
      };
      const pathComponents = {};
      const resourceData = {
        query: {
          ...queryParams,
          qindex: '',
          sort: 'title',
        },
      };
      const logger = { log: noop };
      const props = {
        ...defaultProps,
        resources: {
          query: {
            query: 'foo2',
            qindex: 'contributors',
          },
        },
      };

      const cql = buildSearchQuery(noop)(queryParams, pathComponents, resourceData, logger, props);

      expect(cql).toContain('((title all "foo") and staffSuppress=="false")');
    });

    describe('when there is no qindex in queryParmas', () => {
      it('should use default qindex', () => {
        const queryParams = {
          query: 'foo',
          filters: 'staffSuppress.false',
        };
        const pathComponents = {};
        const resourceData = {
          query: {
            ...queryParams,
            qindex: '',
            sort: 'title',
          },
        };
        const logger = { log: noop };
        const props = {
          ...defaultProps,
          resources: {
            query: {
              query: 'foo2',
              qindex: 'contributors',
            },
          },
        };

        const cql = buildSearchQuery(noop)(queryParams, pathComponents, resourceData, logger, props);

        expect(cql).toContain('((keyword all "foo" or isbn="foo" or issn="foo" or hrid=="foo" or id=="foo") and staffSuppress=="false")');
      });
    });
  });

  describe('plugin', () => {
    it('should use qindex from props.resources.query', () => {
      const query = {
        qindex: queryIndexes.TITLE,
        query: 'foo',
        filters: 'staffSuppress.false',
      };
      const queryParams = {};
      const pathComponents = undefined;
      const resourceData = {
        query: {
          ...query,
          qindex: '',
          sort: 'title',
        },
      };
      const logger = { log: noop };
      const props = {
        ...defaultProps,
        resources: {
          query,
        },
      };

      const cql = buildSearchQuery(noop)(queryParams, pathComponents, resourceData, logger, props);

      expect(cql).toContain('((title all "foo") and staffSuppress=="false")');
    });

    describe('when there is no qindex in props.resources.query', () => {
      it('should use default qindex', () => {
        const query = {
          qindex: '',
          query: 'foo',
          filters: 'staffSuppress.false',
          sort: 'title',
        };
        const queryParams = {};
        const pathComponents = undefined;
        const resourceData = {
          query: {
            ...query,
            qindex: '',
            sort: undefined,
          },
        };
        const logger = { log: noop };
        const props = {
          ...defaultProps,
          resources: {
            query,
          },
        };

        const cql = buildSearchQuery(noop)(queryParams, pathComponents, resourceData, logger, props);

        expect(cql).toContain('((keyword all "foo" or isbn="foo" or issn="foo" or hrid=="foo" or id=="foo") and staffSuppress=="false")');
      });
    });
  });

  it('should replace request url query', () => {
    const queryParams = { ...defaultQueryParamsMap[queryIndexes.CONTRIBUTOR] };
    const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

    expect(mockReplaceRequestUrlQuery).toHaveBeenCalledWith(cql);
  });

  describe('when displaySettings has a default sort', () => {
    it('should apply the sort to requests', () => {
      const qindex = queryIndexes.ISBN;
      const queryParams = { ...defaultQueryParamsMap[qindex] };
      const props = {
        ...defaultProps,
        contextData: {
          displaySettings: {
            defaultSort: 'title',
          },
        },
      };

      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams, props }));

      expect(cql).toEqual(expect.stringContaining('sortby title'));
    });

    describe('when default sort is relevance', () => {
      it('should clear the sort', () => {
        const qindex = queryIndexes.ISBN;
        const queryParams = { ...defaultQueryParamsMap[qindex] };
        const props = {
          ...defaultProps,
          contextData: {
            displaySettings: {
              defaultSort: 'relevance',
            },
          },
        };

        const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams, props }));

        expect(cql).toEqual('isbn="Some ISBN query"');
      });
    });
  });
});
