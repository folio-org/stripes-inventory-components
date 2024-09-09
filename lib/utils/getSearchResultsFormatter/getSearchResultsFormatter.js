import { SEARCH_COLUMN_NAMES } from '../../constants';

export const getSearchResultsFormatter = (data) => {
  return {
    [SEARCH_COLUMN_NAMES.DATE]: (r) => {
      const {
        date1,
        date2,
        dateTypeId,
      } = r.dates || {};

      const {
        delimiter = ', ',
        keepDelimiter, // keepDelimiter specifies whether a delimiter should be present if one of dates is empty
      } = data.instanceDateTypes.find(type => type.id === dateTypeId)?.displayFormat || {};

      if (date1 && date2) {
        const separator = delimiter === ',' ? ', ' : delimiter;
        return `${date1}${separator}${date2}`;
      }

      if (date1 || date2) {
        return [date1, keepDelimiter && delimiter, date2].filter(d => d).join('');
      }

      return '';
    },
  };
};
