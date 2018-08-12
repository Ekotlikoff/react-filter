import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import isEmpty from 'lodash.isempty';
import * as constants from './constants';

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.renderSelectedFilters = this.renderSelectedFilters.bind(this);
        this.renderSelectedFilter = this.renderSelectedFilter.bind(this);
        this.renderFilterTypeSelect = this.renderFilterTypeSelect.bind(this);
        this.getUnselectedFilters = this.getUnselectedFilters.bind(this);
        this.onAddFilter = this.onAddFilter.bind(this);
    }

    renderSelectedFilters() {
        if (isEmpty(this.props.selectedFilters)) {
            return null;
        }
        return (
            <div>
                {Object.keys(this.props.selectedFilters).map(selectedFilterName => {
                    return (
                        <div id={selectedFilterName}>
                            {this.renderSelectedFilter(selectedFilterName)}
                        </div>
                    );
                })}
            </div>
        );
    };

    renderSelectedFilter(selectedFilterName) {
        const availableFilter = this.props.availableFilters[selectedFilterName];
        switch(availableFilter.type) {
            case(constants.FILTER_TYPES.SELECT):
                return this.renderFilterTypeSelect(selectedFilterName);
            default:
                throw new Error('Filter.js: Unrecognized filter type: `' + availableFilter.type + '`.');
        }
    };

    renderFilterTypeSelect(selectedFilterName) {
        return (
            <ReactSelect
                options={this.props.availableFilters[selectedFilterName].options}
                value={this.props.selectedFilters[selectedFilterName].selectedOptions}
            />
        );
    };

    getSelectedFilters() {
        if (!isEmpty(this.props.selectedFilters)) {
            return Object.keys(this.props.selectedFilters)
            .map(filterName => { return { value: filterName, label: filterName };});
        } else {
            return [];
        }
    };

    getUnselectedFilters() {
        if (!isEmpty(this.props.availableFilters)) {
            return Object.keys(this.props.availableFilters)
                .filter(filterName => isEmpty(this.props.selectedFilters) || !this.props.selectedFilters.hasOwnProperty(filterName))
                .map(filterName => { return { value: filterName, label: filterName };});
        } else {
            return [];
        }
    };

    onAddFilter(addedFilter) {
        if (addedFilter) {
            this.props.onChange({ ...this.props.selectedFilters, [addedFilter.value]: { selectedOptions: [] }});
        }
    };

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
    };
}

Filter.propTypes = {
    availableFilters: PropTypes.objectOf(
        PropTypes.shape({
            type: PropTypes.oneOf(Object.values(constants.FILTER_TYPES)),
            options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }))
        })
    ).isRequired,
    selectedFilters: PropTypes.objectOf(
        PropTypes.shape({
            selectedOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }))
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired
}