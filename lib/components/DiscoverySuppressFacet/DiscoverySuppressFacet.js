import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';

const propTypes = {
  accordionsStatus: PropTypes.object.isRequired,
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
};

const DiscoverySuppressFacet = ({
  name,
  closedByDefault = true,
  facetOptions,
  accordionsStatus,
  activeFilters,
  getIsLoading,
  onChange,
  onClear,
  onToggle,
}) => {
  const intl = useIntl();

  return (
    <Facet
      id={name}
      name={name}
      open={accordionsStatus[name]}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.discoverySuppress' })}
      closedByDefault={closedByDefault}
      selectedValues={activeFilters[name]}
      dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
      onChange={onChange}
      onClear={onClear}
      getIsLoading={getIsLoading}
      onToggle={onToggle}
    />
  );
};

DiscoverySuppressFacet.propTypes = propTypes;

export { DiscoverySuppressFacet };
