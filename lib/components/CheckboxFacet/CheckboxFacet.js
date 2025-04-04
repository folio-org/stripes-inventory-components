import React from 'react';
import PropTypes from 'prop-types';

import { withNamespace } from '@folio/stripes/core';

import { CheckboxFacetList } from './CheckboxFacetList';
import { accentFold } from '../../utils';
import { DEFAULT_FILTERS_NUMBER } from '../../constants';
import { getSearchTerm } from '../../stores/facetsStore';

const SHOW_OPTIONS_COUNT = 5;
const SHOW_OPTIONS_INCREMENT = 5;

class CheckboxFacetComponent extends React.Component {
  static propTypes = {
    dataOptions: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.node,
      readOnly: PropTypes.bool,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      count: PropTypes.number,
    })).isRequired,
    hideMoreButton: PropTypes.bool,
    name: PropTypes.string.isRequired,
    namespace: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFetch: PropTypes.func,
    onSearch: PropTypes.func,
    selectedValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    isFilterable: PropTypes.bool,
    isPending: PropTypes.bool,
  };

  static defaultProps = {
    selectedValues: [],
    isFilterable: false,
  };

  state = {
    more: SHOW_OPTIONS_COUNT,
    isMoreClicked: false,
  };

  componentDidUpdate(prevProps) {
    const prevDataLength = prevProps.dataOptions.length;
    const currentDataLength = this.props.dataOptions.length;

    if (this.state.isMoreClicked) {
      if (prevDataLength === DEFAULT_FILTERS_NUMBER && currentDataLength > DEFAULT_FILTERS_NUMBER) {
        this.updateMore();
      } else if (currentDataLength < prevDataLength) { // if filters were reset we need to reset state.more to show +More button
        this.setState({ more: SHOW_OPTIONS_COUNT });
      }
    }
  }

  onMoreClick = (totalOptions) => {
    const {
      onFetch,
      name,
    } = this.props;

    this.setState(({ more }) => {
      let visibleOptionsCount = more + SHOW_OPTIONS_INCREMENT;
      const showingAll = visibleOptionsCount >= totalOptions;
      if (showingAll) visibleOptionsCount = totalOptions;

      return { more: visibleOptionsCount };
    });

    this.setState({ isMoreClicked: true });
    onFetch?.({ name, isMoreClicked: true });
  };

  onFacetSearch = searchTerm => {
    const {
      onSearch,
      name,
    } = this.props;

    onSearch({ name, value: searchTerm });
  };

  onFasetChange = (filterValue) => (e) => {
    const {
      name,
      selectedValues,
      onChange,
    } = this.props;

    const newValues = e.target.checked
      ? [...selectedValues, filterValue]
      : selectedValues.filter((value) => value !== filterValue);

    onChange({
      name,
      values: newValues,
    });
  };

  updateMore = () => {
    this.setState(({ more }) => {
      return { more: more + SHOW_OPTIONS_INCREMENT };
    });
  };

  render() {
    const {
      dataOptions,
      selectedValues,
      isFilterable,
      isPending,
      name,
      namespace,
      hideMoreButton,
      onFetch,
    } = this.props;

    const searchTerm = getSearchTerm(name, namespace);

    const {
      more,
    } = this.state;

    let filteredOptions = dataOptions;

    if (searchTerm.trim()) {
      filteredOptions = filteredOptions.filter(option => {
        return accentFold(option.label)
          .toLowerCase()
          .includes(accentFold(searchTerm).toLowerCase());
      });
    }

    return (
      <CheckboxFacetList
        fieldName={name}
        dataOptions={hideMoreButton ? filteredOptions : filteredOptions.slice(0, more)}
        selectedValues={selectedValues}
        showMore={!hideMoreButton && filteredOptions.length > more}
        showSearch={isFilterable}
        onMoreClick={() => this.onMoreClick(filteredOptions.length)}
        onSearch={this.onFacetSearch}
        onChange={this.onFasetChange}
        onFetch={onFetch}
        isPending={isPending}
      />
    );
  }
}

export const CheckboxFacet = withNamespace(CheckboxFacetComponent);
