import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { DateRangeFilter } from '@folio/stripes/smart-components';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired,
  hideCalendarButton: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onRetrieveDates: PropTypes.func.isRequired,
};

const requiredFields = [];

const DateFilter = ({
  activeFilters,
  dateFormat,
  closedByDefault = true,
  hideCalendarButton = false,
  name,
  onChange,
  onClear,
  onRetrieveDates,
}) => {
  const intl = useIntl();

  const makeFilterString = useCallback((startDate, endDate) => {
    return `${startDate}:${endDate}`;
  }, []);

  const handleClear = useCallback(() => {
    onChange({ name, values: [] });
    onClear?.(name);
  }, [name, onChange, onClear]);

  return (
    <Accordion
      label={intl.formatMessage({ id: `stripes-inventory-components.${name}` })}
      id={name}
      name={name}
      closedByDefault={closedByDefault}
      header={FilterAccordionHeader}
      displayClearButton={activeFilters[name]?.length > 0}
      onClearFilter={handleClear}
    >
      <DateRangeFilter
        name={name}
        dateFormat={dateFormat}
        hideCalendarButton={hideCalendarButton}
        selectedValues={onRetrieveDates(activeFilters[name]?.[0])}
        onChange={onChange}
        makeFilterString={makeFilterString}
        requiredFields={requiredFields}
      />
    </Accordion>
  );
};

DateFilter.propTypes = propTypes;

export { DateFilter };
