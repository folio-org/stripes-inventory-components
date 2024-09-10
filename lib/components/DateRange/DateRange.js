import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { useStripes } from '@folio/stripes/core';
import {
  Accordion,
  FilterAccordionHeader,
  dayjs,
} from '@folio/stripes/components';
import {
  DateRangeFilter,
  DATE_TYPES,
} from '@folio/stripes/smart-components';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const DATE_FORMAT = 'YYYY-MM-DD';

const requiredFields = [DATE_TYPES.START];

const DateRange = ({
  name,
  closedByDefault = true,
  activeFilters,
  onChange,
  onClear,
}) => {
  const intl = useIntl();
  const { timezone } = useStripes();

  const handleDateRangeChange = useCallback(filterData => {
    // sets current tenant's timezone
    dayjs.tz.setDefault(timezone);
    onChange(filterData);
    // restore to a default timezone
    dayjs.tz.setDefault();
  }, [timezone, onChange]);

  const retrieveDatesFromDateRangeFilterString = useCallback(filterValue => {
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
  }, []);

  const makeFilterString = (startDate, endDate) => {
    return `${startDate}:${endDate}`;
  };

  return (
    <Accordion
      label={intl.formatMessage({ id: `stripes-inventory-components.${name}` })}
      id={name}
      name={name}
      closedByDefault={closedByDefault}
      header={FilterAccordionHeader}
      displayClearButton={activeFilters[name]?.length > 0}
      onClearFilter={() => onClear(name)}
    >
      <DateRangeFilter
        name={name}
        dateFormat={DATE_FORMAT}
        selectedValues={retrieveDatesFromDateRangeFilterString(activeFilters[name]?.[0])}
        onChange={handleDateRangeChange}
        makeFilterString={makeFilterString}
        requiredFields={requiredFields}
      />
    </Accordion>
  );
};

DateRange.propTypes = propTypes;

export { DateRange };
