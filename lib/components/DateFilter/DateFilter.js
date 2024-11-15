import {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
  nativeChangeFieldValue,
} from '@folio/stripes/components';
import { DateRangeFilter } from '@folio/stripes/smart-components';

import { useReset } from '../../contexts';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired,
  hideCalendarButton: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  selectedValues: PropTypes.object.isRequired,
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
  selectedValues,
}) => {
  const intl = useIntl();
  const startDateInputRef = useRef();
  const endDateInputRef = useRef();
  const { subscribeOnReset } = useReset();

  const makeFilterString = useCallback((startDate, endDate) => {
    return `${startDate}:${endDate}`;
  }, []);

  const handleClear = useCallback(() => {
    onChange({ name, values: [] });
    onClear?.(name);
  }, [name, onChange, onClear]);

  const onSearchReset = useCallback(() => {
    // use setTimeout to avoid event conflicts that prevent some fields from being cleared.
    setTimeout(() => {
      if (startDateInputRef.current?.value) {
        nativeChangeFieldValue(startDateInputRef, false, '');
      }
      if (endDateInputRef.current?.value) {
        nativeChangeFieldValue(endDateInputRef, false, '');
      }
    });
  }, []);

  // after pressing the search reset button, the date fields will be cleared
  useEffect(() => {
    // we shouldn't unsubscribe if the accordion is closed, as we also need to clear the dates for the closed accordion.
    subscribeOnReset(onSearchReset);
  }, []);

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
        selectedValues={selectedValues}
        onChange={onChange}
        makeFilterString={makeFilterString}
        requiredFields={requiredFields}
        endDateInputRef={endDateInputRef}
        focusRef={startDateInputRef}
      />
    </Accordion>
  );
};

DateFilter.propTypes = propTypes;

export { DateFilter };
