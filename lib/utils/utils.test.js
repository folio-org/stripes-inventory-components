import {
  getQueryTemplate,
  getIsbnIssnTemplate,
  getAdvancedSearchTemplate,
} from './utils';
import { browseModeOptions } from '../constants';

describe('utils', () => {
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

  describe('getIsbnIssnTemplate', () => {
    const mockQueryTemplate = 'Identifier type is <%= identifierTypeId %>';
    const mockIdentifierTypes = [
      { name: 'isbn', id: { 'identifier-type-not-found': 'ISBN' } },
      { name: 'issn', id: { 'identifier-type-not-found': 'ISSN' } },
    ];
    it('should return the template with the correct identifier type when matching query index is found', () => {
      const queryIndex = 'isbn';
      const expectedTemplate = 'Identifier type is ISBN';
      const template = getIsbnIssnTemplate(mockQueryTemplate, mockIdentifierTypes, queryIndex);
      expect(template).toBe(expectedTemplate);
    });
    it('should not return an empty string when matching query index is found', () => {
      const queryIndex = 'other';
      const template = getIsbnIssnTemplate(mockQueryTemplate, mockIdentifierTypes, queryIndex);
      expect(template).toBe('Identifier type is ');
    });
  });
});

describe('getAdvancedSearchTemplate', () => {
  it('should escape quotes', () => {
    const query = getAdvancedSearchTemplate('title startsWith "Seeing-Eye"');
    expect(query).toBe('title all "\\"Seeing-Eye\\"*"');
  });
});
