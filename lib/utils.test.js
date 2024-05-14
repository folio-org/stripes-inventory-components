import { getQueryTemplate } from './utils';
import { browseModeOptions } from './constants';

describe('getQueryTemplate', () => {
  const indexes = [
    {
      label: 'browse.callNumbers',
      queryTemplate: '%{query.query}',
      subIndexes: [
        { label: 'browse.callNumbersAll', value: browseModeOptions.CALL_NUMBERS },
        { label: 'browse.dewey', value: browseModeOptions.DEWEY },
        { label: 'browse.libOfCongress', value: browseModeOptions.LIBRARY_OF_CONGRESS },
        { label: 'browse.local', value: browseModeOptions.LOCAL },
        { label: 'browse.natLibOfMed', value: browseModeOptions.NATIONAL_LIBRARY_OF_MEDICINE },
        { label: 'browse.other', value: browseModeOptions.OTHER },
        { label: 'browse.superintendent', value: browseModeOptions.SUPERINTENDENT },
      ],
    },
    { label: 'browse.contributors', value: browseModeOptions.CONTRIBUTORS, queryTemplate: '%{query.query}' },
    { label: 'browse.subjects', value: browseModeOptions.SUBJECTS, queryTemplate: '%{query.query}' },
  ];

  describe('when a searchable index is in sub indexes', () => {
    it('should return a queryTemplate', () => {
      const queryIndex = browseModeOptions.DEWEY;
      expect(getQueryTemplate(queryIndex, indexes)).toBe('%{query.query}');
    });
  });

  describe('when a searchable index is not in sub indexes', () => {
    it('should return a queryTemplate', () => {
      const queryIndex = browseModeOptions.CONTRIBUTORS;
      expect(getQueryTemplate(queryIndex, indexes)).toBe('%{query.query}');
    });
  });
});
