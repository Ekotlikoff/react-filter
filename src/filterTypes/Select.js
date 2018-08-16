import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { optionsType, selectedOptionsType } from '../propTypeConstants';

export default function Select({
  options, selectedOptions, onChange, isMulti,
}) {
  return (
    <ReactSelect
      options={options}
      value={selectedOptions}
      onChange={onChange}
      isMulti={isMulti}
    />
  );
}

Select.defaultProps = {
  isMulti: false,
  selectedOptions: [],
};

Select.propTypes = {
  options: optionsType.isRequired,
  selectedOptions: selectedOptionsType,
  onChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
};
