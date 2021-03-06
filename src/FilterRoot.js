import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import * as constants from './constants';
import { availableFilterType, selectedFilterType } from './propTypeConstants';
import { FilterRootContainer } from './FilterRootContainer';
import FilterContainer from './filterTypes/FilterContainer';
import Input from './Input';
import Select from './filterTypes/Select';
import defaultStyles from './Styles';
import classNames from './utils';

export default class FilterRoot extends Component {
  static newSelectedFilter(filterName) {
    return { name: filterName, selectedOptions: [] };
  }

  constructor(props) {
    super(props);

    this.state = { requiredFiltersInitialized: false };
    this.isFilterUnselected = this.isFilterUnselected.bind(this);
    this.renderSelectedFilters = this.renderSelectedFilters.bind(this);
    this.renderSelectedFilter = this.renderSelectedFilter.bind(this);
    this.renderFilterTypeSelect = this.renderFilterTypeSelect.bind(this);
    this.getUnselectedFilters = this.getUnselectedFilters.bind(this);
    this.getSelectedFilters = this.getSelectedFilters.bind(this);
    this.onRootChange = this.onRootChange.bind(this);
    this.onChildChange = this.onChildChange.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.initializeRequiredFilters = this.initializeRequiredFilters.bind(this);
    this.deselectFilter = this.deselectFilter.bind(this);
  }

  componentDidMount() {
    const { availableFilters } = this.props;
    const { requiredFiltersInitialized } = this.state;
    if (!isEmpty(availableFilters) && !requiredFiltersInitialized) {
      this.initializeRequiredFilters(availableFilters);
    }
  }

  componentWillReceiveProps({ availableFilters: nextAvailableFilters }) {
    const { requiredFiltersInitialized } = this.state;
    const { availableFilters } = this.props;
    if (
      (!isEmpty(nextAvailableFilters) && !requiredFiltersInitialized)
      || (!isEqual(availableFilters, nextAvailableFilters))
    ) {
      this.initializeRequiredFilters(nextAvailableFilters);
    }
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
        ...newSelectedFilterNames.map(name => FilterRoot.newSelectedFilter(name)),
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

  getCommonProps() {
    const { getStyles, props } = this;
    const { isRtl, classNamePrefix } = props;
    const cxPrefix = classNamePrefix;

    const cx = classNames.bind(null, cxPrefix);
    return {
      cx,
      isRtl,
      getStyles,
      selectProps: props,
    };
  }

  getStyles(key, props) {
    const { styles } = this.props;
    const defaultStyleForKey = defaultStyles[key](props);
    defaultStyleForKey.boxSizing = 'border-box';
    const custom = styles[key];
    return custom ? custom(defaultStyleForKey, props) : defaultStyleForKey;
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

  deselectFilter(filterName) {
    const { onChange, selectedFilters } = this.props;
    onChange(selectedFilters.filter(filter => filter.name !== filterName));
  }

  initializeRequiredFilters(availableFilters) {
    const { onChange } = this.props;
    const requiredFilters = availableFilters
      .filter(f => f.required)
      .map(f => FilterRoot.newSelectedFilter(f.name));
    this.setState({ requiredFiltersInitialized: true });
    if (onChange) {
      onChange(requiredFilters);
    } else {
      throw new Error('Filter.js: No onChange provided.');
    }
  }

  isFilterUnselected(filterName) {
    const { selectedFilters } = this.props;
    return isEmpty(selectedFilters)
      || !selectedFilters.includes(filterName);
  }

  renderFilterTypeSelect(availableFilter, selectedFilter) {
    return (
      <Select
        options={availableFilter.options}
        selectedOptions={selectedFilter.selectedOptions}
        onChange={newOptions => this.onChildChange(selectedFilter, newOptions)}
        isMulti={availableFilter.selectIsMulti}
        {...this.commonProps}
      />
    );
  }

  renderSelectedFilters() {
    const { selectedFilters, availableFilters, showAllSummaries } = this.props;
    if (isEmpty(selectedFilters)) {
      return null;
    }
    return (
      <div>
        {selectedFilters.map((selectedFilter) => {
          const availableFilter = availableFilters
            .find(filter => filter.name === selectedFilter.name);
          return (
            <FilterContainer
              {...this.commonProps}
              id={selectedFilter.name}
              key={selectedFilter.name}
              filterName={selectedFilter.name}
              selectedFilter={selectedFilter}
              availableFilter={availableFilter}
              required={availableFilter.required}
              showAllSummaries={showAllSummaries}
              onDeselect={() => this.deselectFilter(selectedFilter.name)}
            >
              {this.renderSelectedFilter(availableFilter, selectedFilter)}
            </FilterContainer>
          );
        })}
      </div>
    );
  }

  renderSelectedFilter(availableFilter, selectedFilter) {
    switch (availableFilter.type) {
      case (constants.FILTER_TYPES.SELECT):
        return this.renderFilterTypeSelect(availableFilter, selectedFilter);
      default:
        throw new Error(`Filter.js: Unrecognized filter type: \`${availableFilter.type}\`.`);
    }
  }

  render() {
    const { className, isDisabled } = this.props;
    this.commonProps = this.getCommonProps();
    const { commonProps } = this;
    const selectedFilters = this.getSelectedFilters();
    return (
      <FilterRootContainer {...commonProps} className={className} isDisabled={isDisabled}>
        <Input
          {...commonProps}
          isDisabled={isDisabled}
          unselectedFilters={this.getUnselectedFilters()}
          selectedFilters={selectedFilters}
          onChange={this.onRootChange}
        />
        {!isEmpty(selectedFilters) && <hr />}
        {this.renderSelectedFilters()}
      </FilterRootContainer>
    );
  }
}

FilterRoot.defaultProps = {
  showAllSummaries: true,
  className: null,
  styles: {},
  classNamePrefix: null,
  isRtl: false,
  isDisabled: false,
};

FilterRoot.propTypes = {
  availableFilters: PropTypes.arrayOf(
    availableFilterType,
  ).isRequired,
  selectedFilters: PropTypes.arrayOf(
    selectedFilterType,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  showAllSummaries: PropTypes.bool,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.func),
  isRtl: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
