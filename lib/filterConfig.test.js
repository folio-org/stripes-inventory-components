import {
  buildDateIntervalFilterQuery,
  buildDateRangeFilterQuery,
} from './filterConfig';

describe('filterConfig', () => {
  describe('buildDateIntervalFilterQuery', () => {
    describe('when from date is missing', () => {
      it('should return an empty string', () => {
        const name = 'createdDate';
        const values = [''];

        expect(buildDateIntervalFilterQuery(name)(values)).toEqual('');
      });
    });

    describe('when to date is missing', () => {
      it('should return filter with only a from date', () => {
        const name = 'createdDate';
        const values = ['01-01-1970'];

        expect(buildDateIntervalFilterQuery(name)(values)).toMatch(/createdDate>=[^\s]+/);
      });
    });

    describe('when from and to date are present', () => {
      it('should return filter with both dates', () => {
        const name = 'createdDate';
        const values = ['01-01-1970:01-01-1971'];

        expect(buildDateIntervalFilterQuery(name)(values)).toMatch(/createdDate>=[^\s]+ and createdDate<=[^\s]+/);
      });
    });
  });

  describe('buildDateRangeFilterQuery', () => {
    const name = 'normalizedDate1';

    describe('when from date is missing', () => {
      it('should return an empty string', () => {
        const values = [''];

        expect(buildDateRangeFilterQuery(name)(values)).toBe('');
      });
    });

    describe('when to date is missing', () => {
      it('should return filter with only a from date', () => {
        const values = ['2000'];

        expect(buildDateRangeFilterQuery(name)(values)).toBe('normalizedDate1>=2000');
      });
    });

    describe('when from and to date are present', () => {
      it('should return filter with both dates', () => {
        const values = ['2000:2022'];

        expect(buildDateRangeFilterQuery(name)(values)).toBe('normalizedDate1>=2000 and normalizedDate1<=2022');
      });
    });
  });
});
