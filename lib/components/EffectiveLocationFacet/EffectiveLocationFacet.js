import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { MultiSelectionFacet } from '../MultiSelectionFacet';
import { FACETS_TO_REQUEST } from '../../constants';

const propTypes = {
  accordionsStatus: PropTypes.object.isRequired,
  activeFilters: PropTypes.object.isRequired,
  facetOptions: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  separator: PropTypes.bool,
};

const EffectiveLocationFacet = ({
  name,
  accordionsStatus,
  activeFilters,
  separator,
  facetOptions,
  onChange,
  onToggle,
}) => {
  const intl = useIntl();

  return (
    <MultiSelectionFacet
      id={name}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.effectiveLocation' })}
      open={accordionsStatus[name]}
      onToggle={onToggle}
      name={name}
      onChange={onChange}
      options={facetOptions[FACETS_TO_REQUEST[name]]}
      selectedValues={activeFilters[name]}
      displayClearButton={!!activeFilters[name]?.length}
      separator={separator}
    />
  );
};

EffectiveLocationFacet.propTypes = propTypes;

export { EffectiveLocationFacet };
