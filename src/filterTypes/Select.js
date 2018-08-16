import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  selectedOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ),
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ]),
  onChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
};
