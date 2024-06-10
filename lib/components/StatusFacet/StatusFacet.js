import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';

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

const StatusFacet = ({
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

  return (
    <Facet
      id={name}
      name={name}
      label={intl.formatMessage({ id: `stripes-inventory-components.facet.${name}` })}
      closedByDefault={closedByDefault}
      separator={separator}
      isFilterable
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

StatusFacet.propTypes = propTypes;

export { StatusFacet };
