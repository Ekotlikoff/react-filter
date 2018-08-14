import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import isEmpty from 'lodash.isempty';
import * as constants from './constants';

export default class Filter extends Component {
  static newSelectedFilter(filterName) {
    return { name: filterName, selectedOptions: [] };
  }

  constructor(props) {
    super(props);

    this.isFilterUnselected = this.isFilterUnselected.bind(this);
    this.renderSelectedFilters = this.renderSelectedFilters.bind(this);
    this.renderSelectedFilter = this.renderSelectedFilter.bind(this);
    this.renderFilterTypeSelect = this.renderFilterTypeSelect.bind(this);
    this.getUnselectedFilters = this.getUnselectedFilters.bind(this);
    this.getSelectedFilters = this.getSelectedFilters.bind(this);
    this.onRootChange = this.onRootChange.bind(this);
    this.onChildChange = this.onChildChange.bind(this);
  }

  onRootChange(allNewSelectedFilters) {
    const { selectedFilters, onChange } = this.props;
    const allNewSelectedFilterNames = allNewSelectedFilters.map(filter => filter.value);
    const newSelectedFilterNames = allNewSelectedFilterNames
      .filter(name => !selectedFilters.some(filter => filter.name === name));
    const prevSelectedFilters = selectedFilters
      .filter(filter => allNewSelectedFilterNames.includes(filter.name));
    onChange(
      [
        ...prevSelectedFilters,
        ...newSelectedFilterNames.map(name => Filter.newSelectedFilter(name)),
      ],
    );
  }

  onChildChange(selectedFilter, selectedOptions) {
    const { selectedFilters, onChange } = this.props;
    const selectedFilterIndex = selectedFilters
      .findIndex(filter => filter.name === selectedFilter.name);
    onChange(
      Object.assign(
        [...selectedFilters],
        { [selectedFilterIndex]: { ...selectedFilters[selectedFilterIndex], selectedOptions } },
      ),
    );
  }

  getUnselectedFilters() {
    const { availableFilters } = this.props;
    if (!isEmpty(availableFilters)) {
      return availableFilters.map(filter => filter.name)
        .filter(this.isFilterUnselected)
        .map(filterName => ({ value: filterName, label: filterName }));
    }
    return [];
  }

  getSelectedFilters() {
    const { selectedFilters } = this.props;
    if (!isEmpty(selectedFilters)) {
      return selectedFilters.map(({ name }) => ({ value: name, label: name }));
    }
    return [];
  }

  isFilterUnselected(filterName) {
    const { selectedFilters } = this.props;
    return isEmpty(selectedFilters)
      || !selectedFilters.includes(filterName);
  }

  renderFilterTypeSelect(availableFilter, selectedFilter) {
    return (
      <ReactSelect
        options={availableFilter.options}
        value={selectedFilter.selectedOptions}
        onChange={newOption => this.onChildChange(selectedFilter, newOption)}
        isMulti
      />
    );
  }

  renderSelectedFilters() {
    const { selectedFilters } = this.props;
    if (isEmpty(selectedFilters)) {
      return null;
    }
    return (
      <div>
        {selectedFilters.map(selectedFilter => (
          <div key={selectedFilter.name} id={selectedFilter.name}>
            {this.renderSelectedFilter(selectedFilter)}
          </div>
        ))}
      </div>
    );
  }

  renderSelectedFilter(selectedFilter) {
    const { availableFilters } = this.props;
    const availableFilter = availableFilters
      .find(filter => filter.name === selectedFilter.name);
    switch (availableFilter.type) {
      case (constants.FILTER_TYPES.SELECT):
        return this.renderFilterTypeSelect(availableFilter, selectedFilter);
      default:
        throw new Error(`Filter.js: Unrecognized filter type: \`${availableFilter.type}\`.`);
    }
  }

  render() {
    return (
      <div>
        <ReactSelect
          options={this.getUnselectedFilters()}
          value={this.getSelectedFilters()}
          onChange={this.onRootChange}
          hideSelectedOptions
          isMulti
        />
        {this.renderSelectedFilters()}
      </div>
    );
  }
}

Filter.propTypes = {
  availableFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(Object.values(constants.FILTER_TYPES)),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        }),
      ),
      selectIsMulti: PropTypes.bool,
    }),
  ).isRequired,
  selectedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      selectedOptions: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
