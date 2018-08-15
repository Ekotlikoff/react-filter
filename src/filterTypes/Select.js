import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

export default function Select({ options, selectedOptions, onChange }) {
  return (
    <ReactSelect
      options={options}
      value={selectedOptions}
      onChange={onChange}
      isMulti
    />
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
