import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { IfPermission } from '@folio/stripes/core';

import { Facet } from '../Facet';
import {
  FACETS_TO_REQUEST,
  USER_TOUCHED_STAFF_SUPPRESS_STORAGE_KEY,
} from '../../constants';

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

  const clearStaffSuppressStorageFlag = useCallback(() => {
    sessionStorage.setItem(USER_TOUCHED_STAFF_SUPPRESS_STORAGE_KEY, true);
  }, []);

  const handleChange = useCallback((...args) => {
    clearStaffSuppressStorageFlag();
    onChange(...args);
  }, [onChange]);

  return (
    <IfPermission perm="ui-inventory.instance.view-staff-suppressed-records">
      <Facet
        id={name}
        name={name}
        open={accordionsStatus[name]}
        label={intl.formatMessage({ id: 'stripes-inventory-components.facet.staffSuppress' })}
        closedByDefault={closedByDefault}
        selectedValues={activeFilters[name]}
        dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
        onChange={handleChange}
        onToggle={onToggle}
        getIsLoading={getIsLoading}
      />
    </IfPermission>
  );
};

StaffSuppressFacet.propTypes = propTypes;

export { StaffSuppressFacet };
