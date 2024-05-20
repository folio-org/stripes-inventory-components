import { advancedSearchQueryBuilder } from './advancedSearchQueryBuilder';

describe('advancedSearchQueryBuilder', () => {
  it('should format rows into a query string', () => {
    const rows = [{
      bool: '',
      match: 'exactPhrase',
      searchOption: 'keyword',
      query: 'some value',
    }, {
      bool: 'or',
      match: 'containsAll',
      searchOption: 'lccn',
      query: 'some other value',
    }];

    expect(advancedSearchQueryBuilder(rows)).toEqual('keyword exactPhrase some value or lccn containsAll some other value');
  });
});

