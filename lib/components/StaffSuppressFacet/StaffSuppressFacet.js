import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { IfPermission } from '@folio/stripes/core';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  accordionsStatus: PropTypes.object.isRequired,
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const StaffSuppressFacet = ({
  name,
  closedByDefault = true,
  facetOptions,
  activeFilters,
  accordionsStatus,
  getIsLoading,
  onChange,
  onToggle,
}) => {
  const intl = useIntl();

  return (
    <IfPermission perm="ui-inventory.instance.staff-suppressed-records.view">
      <Facet
        id={name}
        name={name}
        open={accordionsStatus[name]}
        label={intl.formatMessage({ id: 'stripes-inventory-components.facet.staffSuppress' })}
        closedByDefault={closedByDefault}
        selectedValues={activeFilters[name]}
        dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
        onChange={onChange}
        onToggle={onToggle}
        getIsLoading={getIsLoading}
      />
    </IfPermission>
  );
};

StaffSuppressFacet.propTypes = propTypes;

export { StaffSuppressFacet };
