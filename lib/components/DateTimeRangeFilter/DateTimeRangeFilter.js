import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { DateFilter } from '../DateFilter';

const propTypes = {
  accordionsStatus: PropTypes.object.isRequired,
  activeFilters: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const DateTimeRangeFilter = ({
  name,
  activeFilters,
  accordionsStatus,
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
      ignoreDatesOrder
      name={name}
      open={accordionsStatus[name]}
      onChange={onChange}
      onClear={onClear}
      selectedValues={selectedValues}
    />
  );
};

DateTimeRangeFilter.propTypes = propTypes;

export { DateTimeRangeFilter };
