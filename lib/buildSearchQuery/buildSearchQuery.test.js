import noop from 'lodash/noop';

import { buildSearchQuery } from './buildSearchQuery';
import { instanceIndexes } from '../filterConfig';
import { queryIndexes } from '../constants';
import buildStripes from '../../test/jest/__mock__/stripesCore.mock';

const getQueryTemplate = (qindex) => instanceIndexes.find(({ value }) => value === qindex).queryTemplate;

const getBuildQueryArgs = ({
  queryParams = {},
  pathComponents = {},
  resourceData = {},
  logger = { log: jest.fn() },
  props = { stripes: buildStripes() }
} = {}) => {
  const resData = { query: { ...queryParams }, ...resourceData };

  return [queryParams, pathComponents, resData, logger, props];
};

const defaultQueryParamsMap = {
  [queryIndexes.CALL_NUMBER]: { qindex: queryIndexes.CALL_NUMBER, query: 'Some call number query' },
  [queryIndexes.CONTRIBUTOR]: { qindex: queryIndexes.CONTRIBUTOR, query: 'Some "contributor" query' },
  [queryIndexes.SUBJECT]: { qindex: queryIndexes.SUBJECT, query: 'Some "subject" query' },
};

describe('buildSearchQuery', () => {
  describe('build query for inventory search', () => {
    it('should build query for \'Effective call number (item), shelving order\' search option', () => {
      const qindex = queryIndexes.CALL_NUMBER;
      const queryParams = { ...defaultQueryParamsMap[qindex] };
      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

      const queryTemplate = getQueryTemplate(qindex);
      expect(cql).toEqual(expect.stringContaining(`${queryTemplate.replace('%{query.query}', defaultQueryParamsMap[qindex].query)}`));
    });

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
      const qindex = queryIndexes.CALL_NUMBER;
      const queryParams = {
        ...defaultQueryParamsMap[qindex],
        selectedBrowseResult: true,
      };
      const cql = buildSearchQuery(noop)(...getBuildQueryArgs({ queryParams }));

      expect(cql).toEqual(expect.stringContaining(`itemEffectiveShelvingOrder==/string "${defaultQueryParamsMap[qindex].query}"`));
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
});