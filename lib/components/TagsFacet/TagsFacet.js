import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { filterState } from '@folio/stripes/components';

import { Facet } from '../Facet';
import { FACETS_TO_REQUEST } from '../../constants';

const propTypes = {
  activeFilters: PropTypes.object.isRequired,
  facetOptions: PropTypes.object.isRequired,
  getIsLoading: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

const TagsFacet = ({
  name,
  facetOptions,
  activeFilters,
  getIsLoading,
  onChange,
  onClear,
  onFetch,
  onSearch,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const hasTagsSelected = !!Object.keys(filterState(urlParams.get('filters')))
    .find((key) => key.startsWith(`${name}.`));

  const dataOptions = facetOptions[FACETS_TO_REQUEST[name]]
    .map(({ label, count }) => ({ label, value: label, count }));

  return (
    <Facet
      id={name}
      name={name}
      label={intl.formatMessage({ id: 'stripes-inventory-components.facet.tags' })}
      closedByDefault={!hasTagsSelected}
      isFilterable
      selectedValues={activeFilters[name]}
      dataOptions={dataOptions}
      onChange={onChange}
      onClear={onClear}
      onFetch={onFetch}
      onSearch={onSearch}
      getIsLoading={getIsLoading}
    />
  );
};

TagsFacet.propTypes = propTypes;

export { TagsFacet };
