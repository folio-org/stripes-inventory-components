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
  closedByDefault: PropTypes.bool,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const StaffSuppressFacet = ({
  name,
  closedByDefault = true,
  facetOptions,
  activeFilters,
  getIsLoading,
  onChange,
  onClear,
}) => {
  const intl = useIntl();

  const clearStaffSuppressStorageFlag = useCallback(() => {
    sessionStorage.setItem(USER_TOUCHED_STAFF_SUPPRESS_STORAGE_KEY, true);
  }, []);

  const handleChange = useCallback((...args) => {
    clearStaffSuppressStorageFlag();
    onChange(...args);
  }, [onChange]);

  const handleClear = useCallback((facetName) => {
    clearStaffSuppressStorageFlag();
    onClear(facetName);
  }, [onClear]);

  return (
    <IfPermission perm="ui-inventory.instance.view-staff-suppressed-records">
      <Facet
        id={name}
        name={name}
        label={intl.formatMessage({ id: 'stripes-inventory-components.facet.staffSuppress' })}
        closedByDefault={closedByDefault}
        selectedValues={activeFilters[name]}
        dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
        onChange={handleChange}
        onClear={handleClear}
        getIsLoading={getIsLoading}
      />
    </IfPermission>
  );
};

StaffSuppressFacet.propTypes = propTypes;

export { StaffSuppressFacet };
