import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export const containerCSS = ({ isDisabled, isRtl }) => ({
  direction: isRtl ? 'rtl' : null,
  pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
  position: 'relative',
});

export const FilterContainer = (props) => {
  const {
    children, className, cx, getStyles, isDisabled, isRtl,
  } = props;
  return (
    <div
      className={cx(
        css(getStyles('container', props)),
        {
          '--is-disabled': isDisabled,
          '--is-rtl': isRtl,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

FilterContainer.defaultProps = {
  className: null,
};

FilterContainer.propTypes = {
  children: PropTypes.node.isRequired,
  cx: PropTypes.func.isRequired,
  getStyles: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isRtl: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
