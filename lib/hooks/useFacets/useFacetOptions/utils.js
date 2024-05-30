import { FormattedMessage } from 'react-intl';

import { formattedLanguageName } from '@folio/stripes/components';

import { itemStatuses } from '../../../constants';

const getFacetDataMap = (facetData, key = 'id') => {
  const facetDataMap = new Map();

  facetData.forEach(data => {
    const id = data[key];
    facetDataMap.set(id, data);
  });

  return facetDataMap;
};

const parseOption = (entry, totals) => {
  const {
    name = '',
    id,
    label = '',
  } = entry;

  const option = {
    label: name || label,
    value: id,
    count: totals,
  };

  return option;
};

const getSelectedFacetOptionsWithoutCount = (selectedFiltersId, entries, facetDataMap, parse = parseOption) => {
  const selectedFiltersWithoutCount = [];

  if (selectedFiltersId) {
    selectedFiltersId.forEach(selectedFilterId => {
      const selectedFilterWithCount = entries.find(filter => filter.id === selectedFilterId);

      if (!selectedFilterWithCount) {
        const facet = facetDataMap.get(selectedFilterId);

        if (facet) {
          const option = parse(facetDataMap.get(selectedFilterId), 0);
          selectedFiltersWithoutCount.push(option);
        }
      }
    });
  }

  return selectedFiltersWithoutCount;
};

export const getFacetOptions = (selectedFiltersId, values, facetData, key, parse = parseOption) => {
  if (!facetData) return null;

  const facetDataMap = getFacetDataMap(facetData, key);

  const restFilters = values.reduce((accum, entry) => {
    if (!entry.totalRecords) return accum;

    const facet = facetDataMap.get(entry.id);

    if (facet) {
      const option = parse(facetDataMap.get(entry.id), entry.totalRecords);
      accum.push(option);
    } else {
      accum.push({
        id: entry.id,
        isDeleted: true,
      });
    }
    return accum;
  }, []);

  return [
    ...restFilters,
    ...getSelectedFacetOptionsWithoutCount(selectedFiltersId, values, facetDataMap, parse),
  ];
};

const getSuppressedLabel = (id) => (id === 'true' ? 'yes' : 'no');
const getSuppressedValue = (id) => (id === 'true' ? 'true' : 'false');

const getOptionsWithoutCount = (selectedFiltersId, optionsRecords) => {
  const selectedFiltersWithoutCount = [];

  if (selectedFiltersId) {
    selectedFiltersId.forEach(selectedFilterId => {
      const selectedFilterWithCount = optionsRecords.find(record => record.id === selectedFilterId);

      if (!selectedFilterWithCount) {
        const option = {
          label: <FormattedMessage id={`stripes-inventory-components.${getSuppressedLabel(selectedFilterId)}`} />,
          value: getSuppressedValue(selectedFilterId),
          count: 0,
        };
        selectedFiltersWithoutCount.push(option);
      }
    });
  }

  return selectedFiltersWithoutCount;
};

export const getSharedOptions = (selectedFiltersId, sharedOptionsRecords) => {
  const restFilter = sharedOptionsRecords.reduce((accum, { id, totalRecords }) => {
    if (!totalRecords) return accum;

    const option = {
      label: <FormattedMessage id={`stripes-inventory-components.${getSuppressedLabel(id)}`} />,
      value: id,
      count: totalRecords,
    };

    accum.push(option);
    return accum;
  }, []);

  return [
    ...restFilter,
    ...getOptionsWithoutCount(selectedFiltersId, sharedOptionsRecords),
  ];
};

export const getSuppressedOptions = (selectedFiltersId, suppressedOptionsRecords) => {
  const restFilter = suppressedOptionsRecords.reduce((accum, { id, totalRecords }) => {
    if (!totalRecords) return accum;

    const option = {
      label: <FormattedMessage id={`stripes-inventory-components.${getSuppressedLabel(id)}`} />,
      value: getSuppressedValue(id),
      count: totalRecords,
    };
    accum.push(option);
    return accum;
  }, []);

  return [
    ...restFilter,
    ...getOptionsWithoutCount(selectedFiltersId, suppressedOptionsRecords),
  ];
};

const getSelectedSourceOptionsWithoutCount = (selectedFiltersId, sourceRecords) => {
  const selectedFiltersWithoutCount = [];

  if (selectedFiltersId) {
    selectedFiltersId.forEach(selectedFilterId => {
      const selectedFilterWithCount = sourceRecords.find(record => record.id === selectedFilterId);

      if (!selectedFilterWithCount) {
        const option = {
          label: selectedFilterId,
          value: selectedFilterId,
          count: 0,
        };
        selectedFiltersWithoutCount.push(option);
      }
    });
  }

  return selectedFiltersWithoutCount;
};

export const getSourceOptions = (selectedFiltersId, sourceRecords) => {
  const restFilter = sourceRecords.reduce((accum, { id, totalRecords }) => {
    if (!totalRecords) return accum;

    const option = {
      label: id,
      value: id,
      count: totalRecords,
    };

    accum.push(option);
    return accum;
  }, []);

  return [
    ...restFilter,
    ...getSelectedSourceOptionsWithoutCount(selectedFiltersId, sourceRecords),
  ];
};

const getSelectedItemStatusOptions = (selectedFiltersId, values, intl) => {
  const selectedFiltersWithoutCount = [];

  if (selectedFiltersId) {
    selectedFiltersId.forEach(selectedFilterId => {
      const selectedFilterWithCount = values.find(filter => filter.id === selectedFilterId);

      if (!selectedFilterWithCount) {
        const {
          value,
          label,
        } = itemStatuses.find(facet => facet.value === selectedFilterId);

        const option = {
          label: intl.formatMessage({ id: label }),
          value,
          count: 0,
        };
        selectedFiltersWithoutCount.push(option);
      }
    });
  }

  return selectedFiltersWithoutCount;
};

export const getItemStatusesOptions = (selectedFiltersId, values, intl) => {
  const restFilters = values.reduce((accum, entry) => {
    if (!entry.totalRecords) return accum;

    const {
      value,
      label,
    } = itemStatuses.find(facet => facet.value === entry.id);

    const option = {
      label: intl.formatMessage({ id: label }),
      value,
      count: entry.totalRecords,
    };
    accum.push(option);
    return accum;
  }, []);

  return [
    ...restFilters,
    ...getSelectedItemStatusOptions(selectedFiltersId, values, intl),
  ];
};

export const getStatisticalCodeOptions = (selectedFiltersId, values, statisticalCodes) => {
  if (!statisticalCodes) return null;

  const parseStatisticalCodeOption = (entry, count) => {
    const {
      name = '',
      id: value,
      code,
      statisticalCodeType,
    } = entry;
    const label = `${statisticalCodeType?.name}: ${code} - ${name}`;
    const option = {
      label,
      value,
      count,
    };

    return option;
  };

  return getFacetOptions(selectedFiltersId, values, statisticalCodes, 'id', parseStatisticalCodeOption);
};

const getSelectedLangsWithoutCount = (selectedLanguagesId, intl, langs) => {
  const selectedLangsWithoutCount = [];

  if (selectedLanguagesId) {
    selectedLanguagesId.forEach(selectedLangId => {
      const selectedLangWithCount = langs.find(lang => lang.id === selectedLangId);

      if (!selectedLangWithCount) {
        const option = {
          label: formattedLanguageName(selectedLangId, intl),
          value: selectedLangId,
          count: 0,
        };
        selectedLangsWithoutCount.push(option);
      }
    });
  }

  return selectedLangsWithoutCount;
};

export const getLanguageOptions = (selectedLanguagesId, intl, langs = []) => {
  const restLangs = langs.reduce((accum, { id, totalRecords }) => {
    if (!totalRecords) return accum;

    const option = {
      label: formattedLanguageName(id, intl),
      value: id,
      count: totalRecords,
    };
    accum.push(option);

    return accum;
  }, []);

  return [
    ...restLangs,
    ...getSelectedLangsWithoutCount(selectedLanguagesId, intl, langs),
  ];
};
