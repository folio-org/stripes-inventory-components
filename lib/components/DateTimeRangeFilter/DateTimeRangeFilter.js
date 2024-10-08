import { useCallback } from 'react';
import PropTypes from 'prop-types';

import { DateFilter } from '../DateFilter';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const DateTimeRangeFilter = ({
  name,
  activeFilters,
  onChange,
  onClear,
}) => {
  const retrieveDates = useCallback(filterValue => {
    const [startDate, endDate] = filterValue?.split(':') || [];

    return {
      startDate: startDate || '',
      endDate: endDate || '',
    };
  }, []);

  return (
    <DateFilter
      activeFilters={activeFilters}
      dateFormat="YYYY"
      hideCalendarButton
      name={name}
      onChange={onChange}
      onClear={onClear}
      onRetrieveDates={retrieveDates}
    />
  );
};

DateTimeRangeFilter.propTypes = propTypes;

export { DateTimeRangeFilter };
