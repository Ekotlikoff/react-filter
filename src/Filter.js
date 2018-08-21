import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import * as constants from './constants';
import { optionsType, selectedOptionsType } from './propTypeConstants';
import { FilterContainer } from './FilterContainer';
import Input from './Input';
import Select from './filterTypes/Select';
import defaultStyles from './Styles';
import classNames from './utils';

export default class Filter extends Component {
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

  initializeRequiredFilters(availableFilters) {
    const { onChange } = this.props;
    const requiredFilters = availableFilters
      .filter(f => f.required)
      .map(f => Filter.newSelectedFilter(f.name));
    this.setState({ requiredFiltersInitialized: true });
    onChange(requiredFilters);
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
    const { className, isDisabled } = this.props;
    this.commonProps = this.getCommonProps();
    const { commonProps } = this;
    return (
      <FilterContainer {...commonProps} className={className} isDisabled={isDisabled}>
        <Input
          {...commonProps}
          isDisabled={isDisabled}
          unselectedFilters={this.getUnselectedFilters()}
          selectedFilters={this.getSelectedFilters()}
          onChange={this.onRootChange}
        />
        {this.renderSelectedFilters()}
      </FilterContainer>
    );
  }
}

Filter.defaultProps = {
  className: null,
  styles: {},
  classNamePrefix: null,
  isRtl: false,
  isDisabled: false,
};

Filter.propTypes = {
  availableFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(constants.FILTER_TYPES)).isRequired,
      options: optionsType.isRequired,
      selectIsMulti: PropTypes.bool,
      required: PropTypes.bool,
    }),
  ).isRequired,
  selectedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selectedOptions: selectedOptionsType.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.func),
  isRtl: PropTypes.bool,
  isDisabled: PropTypes.bool,
};
