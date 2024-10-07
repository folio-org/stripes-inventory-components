import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
  checkIfUserInMemberTenant,
  IfInterface,
  useStripes,
} from '@folio/stripes/core';

import { MultiSelectionFacet } from '../MultiSelectionFacet';
import { FACETS_TO_REQUEST } from '../../constants';

const HeldByFacet = ({
  name,
  accordionsStatus,
  activeFilters,
  facetOptions,
  onChange,
  onToggle,
}) => {
  const intl = useIntl();
  const stripes = useStripes();

  return (
    <IfInterface name="consortia">
      <MultiSelectionFacet
        id={name}
        label={intl.formatMessage({ id: 'stripes-inventory-components.facet.tenantId' })}
        open={accordionsStatus[name]}
        onToggle={onToggle}
        name={name}
        onChange={onChange}
        options={facetOptions[FACETS_TO_REQUEST[name]]}
        selectedValues={activeFilters[name]}
        displayClearButton={!!activeFilters[name]?.length}
        separator={checkIfUserInMemberTenant(stripes)}
      />
    </IfInterface>
  );
};

HeldByFacet.propTypes = {
  accordionsStatus: PropTypes.object.isRequired,
  activeFilters: PropTypes.object.isRequired,
  facetOptions: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export { HeldByFacet };
