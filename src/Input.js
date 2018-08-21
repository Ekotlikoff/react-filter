import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { css } from 'emotion';
import { selectedOptionsType } from './propTypeConstants';

export const inputCSS = ({ isDisabled, isRtl }) => ({
  direction: isRtl ? 'rtl' : null,
  pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
  position: 'relative',
  marginBottom: '10px',
});

export default function Input(props) {
  const {
    unselectedFilters, selectedFilters, onChange, isDisabled, isRtl, getStyles, className, cx,
  } = props;
  return (
    <ReactSelect
      className={cx(
        css(getStyles('input', props)),
        {
          '--is-disabled': isDisabled,
          '--is-rtl': isRtl,
        },
        className,
      )}
      options={unselectedFilters}
      value={selectedFilters}
      onChange={onChange}
      hideSelectedOptions
      controlShouldRenderValue={false}
      isMulti
    />
  );
}

Input.defaultProps = {
  className: null,
};

Input.propTypes = {
  unselectedFilters: selectedOptionsType.isRequired,
  selectedFilters: selectedOptionsType.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isRtl: PropTypes.bool.isRequired,
  getStyles: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired,
  className: PropTypes.string,
};
