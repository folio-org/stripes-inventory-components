import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { DateFilter } from '../DateFilter';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};

const DateTimeRangeFilter = ({
  name,
  activeFilters,
  onChange,
  onClear,
}) => {
  const filterValue = activeFilters[name]?.[0];

  const selectedValues = useMemo(() => {
    const [startDate, endDate] = filterValue?.split(':') || [];

    return {
      startDate: startDate || '',
      endDate: endDate || '',
    };
  }, [filterValue]);

  return (
    <DateFilter
      activeFilters={activeFilters}
      dateFormat="YYYY"
      hideCalendarButton
      name={name}
      onChange={onChange}
      onClear={onClear}
      selectedValues={selectedValues}
    />
  );
};

DateTimeRangeFilter.propTypes = propTypes;

export { DateTimeRangeFilter };
