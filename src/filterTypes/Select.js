import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { css } from 'emotion';
import {
  optionsType, selectedOptionsType, availableFilterType, selectedFilterType,
} from '../propTypeConstants';

export const summaryCSS = ({ isRtl, availableFilter }) => ({
  direction: isRtl ? 'rtl' : null,
  position: 'relative',
  display: 'inline',
  marginRight: availableFilter.required ? '0px' : '10px',
  float: 'right',
  color: '#0000FF',
});

export const SelectSummary = (props) => {
  const {
    availableFilter, selectedFilter, cx, isRtl,
  } = props;
  let numSelectedOptions = 0;
  if (selectedFilter.selectedOptions) {
    numSelectedOptions = Array.isArray(selectedFilter.selectedOptions)
      ? selectedFilter.selectedOptions.length
      : 1;
  }
  return (
    <span
      className={cx(
        css(summaryCSS(props)),
        {
          '--is-rtl': isRtl,
        },
      )}
    >
      {numSelectedOptions}
      /
      {availableFilter.options.length}
    </span>
  );
};

SelectSummary.propTypes = {
  availableFilter: availableFilterType.isRequired,
  selectedFilter: selectedFilterType.isRequired,
  cx: PropTypes.func.isRequired,
  isRtl: PropTypes.bool.isRequired,
};

export default function Select(props) {
  const {
    options, selectedOptions, onChange, isRtl, isMulti,
  } = props;
  return (
    <div>
      <ReactSelect
        options={options}
        value={selectedOptions}
        onChange={onChange}
        isMulti={isMulti}
        isRtl={isRtl}
      />
    </div>
  );
}

Select.defaultProps = {
  isMulti: false,
  selectedOptions: [],
  showSummary: true,
};

Select.propTypes = {
  options: optionsType.isRequired,
  selectedOptions: selectedOptionsType,
  onChange: PropTypes.func.isRequired,
  isRtl: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool,
};
