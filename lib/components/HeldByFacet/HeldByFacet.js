import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { IfInterface } from '@folio/stripes/core';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';


const HeldByFacet = ({
  name,
  activeFilters,
  facetOptions,
  closedByDefault = true,
  onIsLoading,
  onChange,
  onClear,
  onFetchFacets,
  onSearch,
}) => {
  const intl = useIntl();

  return (
    <IfInterface name="consortia">
      <Facet
        id={name}
        name={name}
        label={intl.formatMessage({ id: 'stripes-inventory-components.filters.tenantId' })}
        closedByDefault={closedByDefault}
        selectedValues={activeFilters[name]}
        dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
        isFilterable
        onSearch={onSearch}
        onFetch={onFetchFacets}
        onChange={onChange}
        onClear={onClear}
        onIsLoading={onIsLoading}
      />
    </IfInterface>
  );
};

HeldByFacet.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  onIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onFetchFacets: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export { HeldByFacet };
