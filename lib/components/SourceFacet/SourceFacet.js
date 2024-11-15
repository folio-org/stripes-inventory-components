import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { FACETS_TO_REQUEST } from '../../constants';
import { Facet } from '../Facet';

const propTypes = {
  accordionsStatus: PropTypes.object.isRequired,
  activeFilters: PropTypes.object.isRequired,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const SourceFacet = ({
  name,
  facetOptions,
  accordionsStatus,
  activeFilters,
  getIsLoading,
  onChange,
  onToggle,
}) => {
  const intl = useIntl();

  return (
    <Facet
      id={name}
      name={name}
      open={accordionsStatus[name]}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.source' })}
      hideMoreButton
      selectedValues={activeFilters[name]}
      dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
      onChange={onChange}
      getIsLoading={getIsLoading}
      onToggle={onToggle}
    />
  );
};

SourceFacet.propTypes = propTypes;

export { SourceFacet };
