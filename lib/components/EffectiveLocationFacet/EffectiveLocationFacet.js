import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';
import { useIsFetchingAllLocations } from '../../hooks';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  separator: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

const EffectiveLocationFacet = ({
  name,
  closedByDefault = true,
  separator = true,
  facetOptions,
  activeFilters,
  getIsLoading,
  onChange,
  onClear,
  onFetch,
  onSearch,
}) => {
  const intl = useIntl();
  const isLoadingLocationsFromAllTenants = useIsFetchingAllLocations();

  return (
    <Facet
      id={name}
      name={name}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.effectiveLocation' })}
      closedByDefault={closedByDefault}
      separator={separator}
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

EffectiveLocationFacet.propTypes = propTypes;

export { EffectiveLocationFacet };
