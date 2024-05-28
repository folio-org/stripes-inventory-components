import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { IfInterface } from '@folio/stripes/core';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';


const HeldByFacet = ({
  name,
  facetOptions,
  selectedValues,
  getIsLoading,
  onChange,
  onClear,
  onFetchFacets,
  onSearch,
}) => {
  const intl = useIntl();

  return (
    <IfInterface name="consortia">
      <Facet
        id={name}
        name={name}
        label={intl.formatMessage({ id: 'stripes-inventory-components.filters.tenantId' })}
        closedByDefault
        selectedValues={selectedValues}
        dataOptions={facetOptions[FACETS_TO_REQUEST[name]]}
        isFilterable
        onSearch={onSearch}
        onFetch={onFetchFacets}
        onChange={onChange}
        onClear={onClear}
        getIsLoading={getIsLoading}
      />
    </IfInterface>
  );
};

HeldByFacet.propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.object),
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onFetchFacets: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export { HeldByFacet };
