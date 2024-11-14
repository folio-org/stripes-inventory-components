import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import { dayjs } from '@folio/stripes/components';

import { DateFilter } from '../DateFilter';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const DATE_FORMAT = 'YYYY-MM-DD';

const DateIntervalFilter = ({
  name,
  activeFilters,
  onChange,
}) => {
  const { timezone } = useStripes();

  const handleDateRangeChange = useCallback(filterData => {
    // sets current tenant's timezone
    dayjs.tz.setDefault(timezone);
    onChange(filterData);
    // restore to a default timezone
    dayjs.tz.setDefault();
  }, [timezone, onChange]);

  const filterValue = activeFilters[name]?.[0];

  const selectedValues = useMemo(() => {
    let dateRange = {
      startDate: '',
      endDate: '',
    };

    if (filterValue) {
      const [startDateString, endDateString] = filterValue.split(':');
      const endDate = dayjs.utc(endDateString);
      const startDate = dayjs.utc(startDateString);

      dateRange = {
        startDate: startDate.isValid()
          ? startDate.format(DATE_FORMAT)
          : '',
        endDate: endDate.isValid()
          ? endDate.format(DATE_FORMAT)
          : '',
      };
    }

    return dateRange;
  }, [filterValue]);

  return (
    <DateFilter
      activeFilters={activeFilters}
      dateFormat={DATE_FORMAT}
      name={name}
      onChange={handleDateRangeChange}
      selectedValues={selectedValues}
    />
  );
};

DateIntervalFilter.propTypes = propTypes;

export { DateIntervalFilter };
