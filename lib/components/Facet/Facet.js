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
  isFilterable: PropTypes.bool,
  isLoadingOptions: PropTypes.bool,
  selectedValues: PropTypes.arrayOf(PropTypes.object),
  dataOptions: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onGetIsPending: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onFetch: PropTypes.func,
};

export const Facet = ({
  id,
  name,
  label,
  closedByDefault = true,
  separator = false,
  isFilterable = false,
  isLoadingOptions = false,
  selectedValues = [],
  dataOptions = [],
  onChange,
  onClear,
  onGetIsPending,
  onSearch,
  onFetch,
}) => {
  return (
    <Accordion
      id={id}
      name={name}
      label={label}
      closedByDefault={closedByDefault}
      separator={separator}
      header={FilterAccordionHeader}
      displayClearButton={selectedValues?.length > 0}
      onClearFilter={() => onClear(name)}
    >
      {isLoadingOptions
        ? <Loading data-testid="loading-options" />
        : (
          <CheckboxFacet
            name={name}
            dataOptions={dataOptions}
            selectedValues={selectedValues}
            onChange={onChange}
            onSearch={onSearch}
            onFetch={onFetch}
            isPending={onGetIsPending(name)}
            isFilterable={isFilterable}
          />
        )
      }
    </Accordion>
  );
};

Facet.propTypes = propTypes;
