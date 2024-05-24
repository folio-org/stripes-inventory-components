import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { IfInterface } from '@folio/stripes/core';

import { Facet } from '../Facet';
import { FACETS_OPTIONS } from '../../constants';


const HeldByFacet = ({
  name,
  facetsOptions,
  selectedValues,
  onChange,
  onClear,
  onFetchFacets,
  onFilterSearch,
  onGetIsPending,
}) => {
  const intl = useIntl();

  return (
    <IfInterface name="consortia">
      <Facet
        id={name}
        name={name}
        label={intl.formatMessage({ id: 'stripes-inventory-components.filters.tenantId' })}
        closedByDefault
        selectedValues={selectedValues}
        dataOptions={facetsOptions[FACETS_OPTIONS.HELD_BY_OPTIONS] || []}
        isFilterable
        onSearch={onFilterSearch}
        onFetch={onFetchFacets}
        onChange={onChange}
        onClear={onClear}
        onGetIsPending={onGetIsPending}
      />
    </IfInterface>
  );
};

HeldByFacet.propTypes = {
  selectedValues: PropTypes.object,
  facetsOptions: PropTypes.object.isRequired,
  onGetIsPending: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onFetchFacets: PropTypes.func.isRequired,
  onFilterSearch: PropTypes.func.isRequired,
};

export { HeldByFacet };
