import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import isEmpty from 'lodash.isempty';
import * as constants from './constants';

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.isFilterUnselected = this.isFilterUnselected.bind(this);
    this.renderSelectedFilters = this.renderSelectedFilters.bind(this);
    this.renderSelectedFilter = this.renderSelectedFilter.bind(this);
    this.renderFilterTypeSelect = this.renderFilterTypeSelect.bind(this);
    this.getUnselectedFilters = this.getUnselectedFilters.bind(this);
    this.onAddFilter = this.onAddFilter.bind(this);
  }

  onAddFilter(addedFilter) {
    if (addedFilter) {
      this.props.onChange({
        ...this.props.selectedFilters,
        [addedFilter.value]: { selectedOptions: [] },
      });
    }
  }

  getSelectedFilters() {
    if (!isEmpty(this.props.selectedFilters)) {
      return Object.keys(this.props.selectedFilters)
        .map(filterName => ({ value: filterName, label: filterName }));
    }
    return [];
  }

  getUnselectedFilters() {
    if (!isEmpty(this.props.availableFilters)) {
      return Object.keys(this.props.availableFilters)
        .filter(this.isFilterUnselected)
        .map(filterName => ({ value: filterName, label: filterName }));
    }
    return [];
  }

  isFilterUnselected(filterName) {
    return isEmpty(this.props.selectedFilters)
      || !Object.prototype.hasOwnProperty.call(this.props.selectedFilters, filterName);
  }

  renderFilterTypeSelect(selectedFilterName) {
    return (
      <ReactSelect
        options={this.props.availableFilters[selectedFilterName].options}
        value={this.props.selectedFilters[selectedFilterName].selectedOptions}
      />
    );
  }

  renderSelectedFilters() {
    if (isEmpty(this.props.selectedFilters)) {
      return null;
    }
    return (
      <div>
        {Object.keys(this.props.selectedFilters).map(selectedFilterName => (
          <div key={selectedFilterName} id={selectedFilterName}>
            {this.renderSelectedFilter(selectedFilterName)}
          </div>
        ))}
      </div>
    );
  }

  renderSelectedFilter(selectedFilterName) {
    const availableFilter = this.props.availableFilters[selectedFilterName];
    switch (availableFilter.type) {
      case (constants.FILTER_TYPES.SELECT):
        return this.renderFilterTypeSelect(selectedFilterName);
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
          onChange={this.onAddFilter}
        />
        {this.renderSelectedFilters()}
      </div>
    );
  }
}

Filter.propTypes = {
  availableFilters: PropTypes.objectOf(
    PropTypes.shape({
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
  selectedFilters: PropTypes.objectOf(
    PropTypes.shape({
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
