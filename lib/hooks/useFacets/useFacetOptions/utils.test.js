import { FormattedMessage } from 'react-intl';
import {
  getFacetOptions,
  getSuppressedOptions,
  getSourceOptions,
  getItemStatusesOptions,
} from './utils';

describe('getFacetOptions', () => {
  it('getFacetOptions returns the expected options with valid input', () => {
    const selectedFiltersId = ['filter1', 'filter2'];
    const entries = [
      { id: 'filter1', totalRecords: 2 },
      { id: 'filter3', totalRecords: 4 },
    ];
    const facetData = [
      { id: 'filter1', name: 'Filter 1' },
      { id: 'filter2', name: 'Filter 2' },
      { id: 'filter3', name: 'Filter 3' },
    ];
    const key = 'id';
    const expectedOptions = [
      { label: 'Filter 1', value: 'filter1', count: 2 },
      { label: 'Filter 3', value: 'filter3', count: 4 },
      { label: 'Filter 2', value: 'filter2', count: 0 },
    ];
    expect(getFacetOptions(selectedFiltersId, entries, facetData, { key })).toEqual(expectedOptions);
  });
  it('getFacetOptions handles invalid id values in entries correctly', () => {
    const selectedFiltersId = ['filter1', 'filter2'];
    const entries = [
      { id: 'filter1', totalRecords: 2 },
      { id: 'invalid', totalRecords: 4 },
    ];
    const facetData = [
      { id: 'filter1', name: 'Filter 1' },
      { id: 'filter2', name: 'Filter 2' },
      { id: 'filter3', name: 'Filter 3' },
    ];
    const key = 'id';
    const expectedOptions = [
      { label: 'Filter 1', value: 'filter1', count: 2 },
      { id: 'invalid', isDeleted: true },
      { label: 'Filter 2', value: 'filter2', count: 0 },
    ];
    expect(getFacetOptions(selectedFiltersId, entries, facetData, { key })).toEqual(expectedOptions);
  });
});

describe('getSuppressedOptions', () => {
  it('returns an array of objects with the correct selectedFiltersId & suppressedOptionsRecords', () => {
    const selectedFiltersId = [];
    const suppressedOptionsRecords = [{ id: 'foo', totalRecords: 10 }];
    const result = getSuppressedOptions(selectedFiltersId, suppressedOptionsRecords);
    expect(result).toEqual([
      {
        label: expect.any(Object),
        value: expect.any(String),
        count: expect.any(Number),
      },
    ]);
  });
  it('should return the correct options when <no> filters are selected', () => {
    const selectedFiltersId = [];
    const suppressedOptionsRecords = [
      { id: 'on_order', totalRecords: 5 },
      { id: 'suppressed', totalRecords: 0 },
    ];
    const expectedOptions = [
      {
        label: <FormattedMessage id="stripes-inventory-components.no" />,
        value: expect.any(String),
        count: 5,
      },
    ];
    expect(getSuppressedOptions(selectedFiltersId, suppressedOptionsRecords)).toEqual(expectedOptions);
  });
  it('should return the correct options when some filters are selected', () => {
    const selectedFiltersId = ['on_order', 'suppressed'];
    const suppressedOptionsRecords = [
      { id: 'on_order', totalRecords: 5 },
      { id: 'suppressed', totalRecords: 10 },
    ];
    const expectedOptions = [
      {
        label: <FormattedMessage id="stripes-inventory-components.no" />,
        value: expect.any(String),
        count: 5,
      },
      {
        label: <FormattedMessage id="stripes-inventory-components.no" />,
        value: expect.any(String),
        count: 10,
      },
    ];
    expect(getSuppressedOptions(selectedFiltersId, suppressedOptionsRecords)).toEqual(expectedOptions);
  });
});

describe('getSourceOptions', () => {
  it('returns an array of options with the correct shape for each source record with a totalRecords property', () => {
    const sourceRecords = [
      { id: 'source1', totalRecords: 10 },
      { id: 'source2', totalRecords: 20 },
      { id: 'source3', totalRecords: 30 },
    ];
    const selectedFiltersId = ['source1'];
    const expectedOptions = [
      { label: 'source1', value: 'source1', count: 10 },
      { label: 'source2', value: 'source2', count: 20 },
      { label: 'source3', value: 'source3', count: 30 },
    ];
    expect(getSourceOptions(selectedFiltersId, sourceRecords)).toEqual(expectedOptions);
  });
  it('returns an array of options with the correct shape for each selected filter ID that is not in the source records array', () => {
    const sourceRecords = [
      { id: 'source1', totalRecords: 10 },
      { id: 'source2', totalRecords: 20 },
      { id: 'source3', totalRecords: 30 },
    ];
    const selectedFiltersId = ['source1', 'source4'];
    const expectedOptions = [
      { label: 'source1', value: 'source1', count: 10 },
      { label: 'source2', value: 'source2', count: 20 },
      { label: 'source3', value: 'source3', count: 30 },
      { label: 'source4', value: 'source4', count: 0 },
    ];
    expect(getSourceOptions(selectedFiltersId, sourceRecords)).toEqual(expectedOptions);
  });

  it('returns an empty array when both the sourceRecords and selectedFiltersId parameters are empty arrays', () => {
    const sourceRecords = [];
    const selectedFiltersId = [];
    expect(getSourceOptions(selectedFiltersId, sourceRecords)).toEqual([]);
  });
});

describe('getItemStatusesOptions', () => {
  it('returns an array of objects with the correct keys and values', () => {
    const selectedFiltersId = ['Available', 'Awaiting pickup'];
    const values = [
      { id: 'Available', totalRecords: 10 },
      { id: 'Awaiting pickup', totalRecords: 20 },
    ];
    const intl = {
      formatMessage: jest.fn(() => 'Formatted message'),
    };
    const options = getItemStatusesOptions(selectedFiltersId, values, intl);
    expect(intl.formatMessage).toHaveBeenCalledTimes(2);
    expect(options).toEqual([
      { count: 10, label: 'Formatted message', value: 'Available' },
      { count: 20, label: 'Formatted message', value: 'Awaiting pickup' },
    ]);
  });

  it('includes all filters in entries with a totalRecords value in the returned array', () => {
    const selectedFiltersId = ['Available', 'Awaiting pickup'];
    const values = [
      { id: 'Available', totalRecords: 10 },
      { id: 'Awaiting pickup', totalRecords: 0 },
      { id: 'In process', totalRecords: 20 },
    ];
    const intl = {
      formatMessage: jest.fn(() => 'Formatted message'),
    };
    const options = getItemStatusesOptions(selectedFiltersId, values, intl);
    expect(options).toEqual([
      { label: 'Formatted message', value: 'Available', count: 10 },
      { label: 'Formatted message', value: 'In process', count: 20 },
    ]);
  });
});
