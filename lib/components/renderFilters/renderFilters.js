import { InstanceFilters } from '../InstanceFilters';
import { HoldingsRecordFilters } from '../HoldingsRecordFilters';
import { ItemFilters } from '../ItemFilters';
import { segments } from '../../constants';

const filterComponents = {
  [segments.instances]: InstanceFilters,
  [segments.holdings]: HoldingsRecordFilters,
  [segments.items]: ItemFilters,
};

const renderFilters = ({ data, query, segment, onFilterChange }) => (onChange) => {
  const _segment = query.segment || segment || segments.instances;
  const FiltersComponent = filterComponents[_segment];

  return (
    <FiltersComponent
      data={data}
      query={query}
      segment={_segment}
      onChange={onFilterChange(onChange)}
    />
  );
};

export { renderFilters };
