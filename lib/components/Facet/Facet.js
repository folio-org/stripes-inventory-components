import { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
  Loading,
} from '@folio/stripes/components';

import { CheckboxFacet } from '../CheckboxFacet';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  closedByDefault: PropTypes.bool,
  separator: PropTypes.bool,
  isLoadingOptions: PropTypes.bool,
  selectedValues: PropTypes.arrayOf(PropTypes.any),
  dataOptions: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  open: PropTypes.bool,
  getIsLoading: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
};

export const Facet = ({
  id,
  name,
  open,
  label,
  closedByDefault = true,
  separator = true,
  isLoadingOptions = false,
  selectedValues = [],
  dataOptions = [],
  onChange,
  onClear,
  getIsLoading,
  onToggle,
}) => {
  const handleClear = useCallback(() => {
    onChange({ name, values: [] });
    onClear?.(name);
  }, [name, onChange]);

  return (
    <Accordion
      id={id}
      name={name}
      open={open}
      label={label}
      closedByDefault={closedByDefault}
      separator={separator}
      header={FilterAccordionHeader}
      displayClearButton={selectedValues?.length > 0}
      onClearFilter={handleClear}
      onToggle={onToggle}
    >
      {isLoadingOptions
        ? <Loading data-testid="loading-options" />
        : (
          <CheckboxFacet
            name={name}
            dataOptions={dataOptions}
            selectedValues={selectedValues}
            onChange={onChange}
            isPending={getIsLoading(name)}
          />
        )
      }
    </Accordion>
  );
};

Facet.propTypes = propTypes;
