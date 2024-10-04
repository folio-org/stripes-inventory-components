import {
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  MultiSelection,
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';

import { OptionFormatter } from './OptionFormatter';

const propTypes = {
  displayClearButton: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number,
  })),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  separator: PropTypes.bool,
};

const MultiSelectionFacet = ({
  id,
  label,
  open = false,
  onToggle,
  name,
  onChange,
  onClear,
  options,
  selectedValues,
  separator,
  displayClearButton,
}) => {
  const dataOptions = useMemo(() => options?.filter(option => !option.isDeleted) || [], [options]);

  const handleChange = useCallback(newOptions => {
    onChange({
      name,
      values: newOptions.map(option => option.value),
    });
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange({ name, values: [] });
    onClear?.(name);
  }, [onChange, name, onClear]);

  // `itemToString` is used for `key` in the list, so let's also include `option.value`
  // since some options may have the same label. For instance, language facet labels, "en" and "eng" are converted
  // to the label "English". Without a unique key, performance degrades significantly for 2k+ items.
  const itemToString = useCallback(option => {
    return `${option?.label}-${option?.value}`;
  }, []);

  const selectedOptions = useMemo(() => {
    return dataOptions.filter(option => (selectedValues || []).includes(option.value));
  }, [dataOptions, selectedValues]);

  return (
    <Accordion
      label={label}
      id={id}
      open={open}
      onToggle={onToggle}
      separator={separator}
      header={FilterAccordionHeader}
      headerProps={{
        label,
      }}
      onClearFilter={handleClear}
      displayClearButton={displayClearButton}
      closedByDefault={!open}
    >
      <MultiSelection
        id={`${id}-multiselect`}
        label={label}
        name={name}
        formatter={OptionFormatter}
        valueFormatter={({ option }) => option.label}
        onChange={handleChange}
        dataOptions={dataOptions}
        itemToString={itemToString}
        value={selectedOptions}
      />
    </Accordion>
  );
};

MultiSelectionFacet.propTypes = propTypes;

export { MultiSelectionFacet };
