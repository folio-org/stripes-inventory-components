import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  checkIfUserInMemberTenant,
  useStripes,
} from '@folio/stripes/core';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';

const propTypes = {
  name: PropTypes.string.isRequired,
  accordionsStatus: PropTypes.object.isRequired,
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  getIsLoading: PropTypes.func.isRequired,
};

const SharedFacet = ({
  name,
  accordionsStatus,
  activeFilters,
  closedByDefault = true,
  facetOptions,
  onChange,
  onToggle,
  getIsLoading,
}) => {
  const intl = useIntl();
  const stripes = useStripes();

  if (!checkIfUserInMemberTenant(stripes)) {
    return null;
  }

  return (
    <Facet
      id={name}
      name={name}
      open={accordionsStatus[name]}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.shared' })}
      closedByDefault={closedByDefault}
      separator={false}
      selectedValues={activeFilters[name]}
      dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
      onChange={onChange}
      onToggle={onToggle}
      getIsLoading={getIsLoading}
    />
  );
};

SharedFacet.propTypes = propTypes;

export { SharedFacet };
