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
  activeFilters: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  suppressSharedFacet: PropTypes.bool,
};

const SharedFacet = ({
  name,
  activeFilters,
  closedByDefault = true,
  facetOptions,
  onChange,
  onClear,
  getIsLoading,
  suppressSharedFacet = false,
}) => {
  const intl = useIntl();
  const stripes = useStripes();

  if (!checkIfUserInMemberTenant(stripes) || suppressSharedFacet) {
    return null;
  }

  return (
    <Facet
      id={name}
      name={name}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.shared' })}
      closedByDefault={closedByDefault}
      separator={false}
      selectedValues={activeFilters[name]}
      dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
      onChange={onChange}
      onClear={onClear}
      getIsLoading={getIsLoading}
    />
  );
};

SharedFacet.propTypes = propTypes;

export { SharedFacet };
