import { buildDateRangeQuery } from './filterConfig';

describe('filterConfig', () => {
  describe('buildDateRangeQuery', () => {
    describe('when from date is missing', () => {
      it('should return an empty string', () => {
        const name = 'createdDate';
        const values = [''];

        expect(buildDateRangeQuery(name)(values)).toEqual('');
      });
    });

    describe('when to date is missing', () => {
      it('should return filter with only a from date', () => {
        const name = 'createdDate';
        const values = ['01-01-1970'];

        expect(buildDateRangeQuery(name)(values)).toMatch(/createdDate>=[^\s]+/);
      });
    });

    describe('when from and to date are present', () => {
      it('should return filter with both dates', () => {
        const name = 'createdDate';
        const values = ['01-01-1970:01-01-1971'];

        expect(buildDateRangeQuery(name)(values)).toMatch(/createdDate>=[^\s]+ and createdDate<=[^\s]+/);
      });
    });
  });
});
