import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const removeButtonCSS = ({ isRtl }) => ({
  direction: isRtl ? 'rtl' : null,
  position: 'relative',
  display: 'inline',
  cursor: 'pointer',
  height: '20px',
  padding: 0,
  float: 'right',
  color: 'red',
  background: 'none',
  border: 'none',
  'text-decoration': 'none',
});

export const RemoveButton = (props) => {
  const { onDeselect, cx, isRtl } = props;
  return (
    <button
      type="button"
      className={cx(
        css(removeButtonCSS(props)),
        {
          '--is-rtl': isRtl,
        },
      )}
      onClick={onDeselect}
    >
      x
    </button>
  );
};

RemoveButton.propTypes = {
  onDeselect: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired,
  isRtl: PropTypes.bool.isRequired,
};

export const titleContainerCSS = ({ isRtl }) => ({
  direction: isRtl ? 'rtl' : null,
  position: 'relative',
});

const requiredAsterixCSS = () => ({
  position: 'relative',
  color: 'red',
});

export const Title = (props) => {
  const {
    filterName, required, cx, getStyles, isRtl,
  } = props;
  const requiredAsterix = required && (
    <span className={cx(
      css(requiredAsterixCSS(props)),
      {
        '--is-rtl': isRtl,
      },
    )}
    >
      *
    </span>
  );
  return (
    <div
      className={cx(
        css(getStyles('titleContainer', props)),
        {
          '--is-rtl': isRtl,
        },
      )}
    >
      {filterName}
      { ' ' }
      {requiredAsterix}
      {!required && <RemoveButton {...props} />}
    </div>
  );
};

Title.propTypes = {
  filterName: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  cx: PropTypes.func.isRequired,
  getStyles: PropTypes.func.isRequired,
  isRtl: PropTypes.bool.isRequired,
};

export const filterContainerCSS = ({ isRtl }) => ({
  direction: isRtl ? 'rtl' : null,
  position: 'relative',
});

export default function FilterContainer(props) {
  const {
    children, cx, getStyles, isRtl,
  } = props;
  return (
    <div
      className={cx(
        css(getStyles('filterContainer', props)),
        {
          '--is-rtl': isRtl,
        },
      )}
    >
      <Title {...props} />
      {children}
    </div>
  );
}

FilterContainer.defaultProps = {
  required: false,
};

FilterContainer.propTypes = {
  filterName: PropTypes.string.isRequired,
  onDeselect: PropTypes.func.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cx: PropTypes.func.isRequired,
  getStyles: PropTypes.func.isRequired,
  isRtl: PropTypes.bool.isRequired,
};
