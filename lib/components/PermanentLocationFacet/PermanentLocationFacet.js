import { useIntl } from 'react-intl';
import { useIsFetching } from 'react-query';
import PropTypes from 'prop-types';

import { useNamespace } from '@folio/stripes/core';

import { Facet } from '../Facet';
import {
  FACETS_TO_REQUEST,
  QUERY_KEY_LOCATIONS_FROM_ALL_TENANTS,
} from '../../constants';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

const PermanentLocationFacet = ({
  name,
  closedByDefault = true,
  facetOptions,
  activeFilters,
  getIsLoading,
  onChange,
  onClear,
  onFetch,
  onSearch,
}) => {
  const intl = useIntl();
  const [namespace] = useNamespace();
  // In the member tenant, locations from all tenants are fetched after the tenants are loaded, so these will be
  // subsequent requests. This adds a huge delay to the first render in the DataProvider. It is better to wait for
  // all locations here.
  const isLoadingLocationsFromAllTenants = !!useIsFetching({ queryKey: [namespace, QUERY_KEY_LOCATIONS_FROM_ALL_TENANTS] });

  return (
    <Facet
      id={name}
      name={name}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.holdingsPermanentLocation' })}
      closedByDefault={closedByDefault}
      isFilterable
      isLoadingOptions={isLoadingLocationsFromAllTenants}
      selectedValues={activeFilters[name]}
      dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
      onChange={onChange}
      onClear={onClear}
      onFetch={onFetch}
      onSearch={onSearch}
      getIsLoading={getIsLoading}
    />
  );
};

PermanentLocationFacet.propTypes = propTypes;

export { PermanentLocationFacet };
