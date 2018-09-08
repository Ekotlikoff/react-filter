import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { SelectSummary } from './Select';
import { availableFilterType, selectedFilterType } from '../propTypeConstants';
import { FILTER_TYPES } from '../constants';

const removeButtonCSS = ({ isRtl }) => ({
  direction: isRtl ? 'rtl' : null,
  cursor: 'pointer',
  height: '24px',
  'font-size': '13px',
  float: 'right',
  color: '#F75E5E',
  border: 'none',
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

const renderSummary = (props) => {
  switch (props.availableFilter.type) {
    case (FILTER_TYPES.SELECT):
      return (
        <SelectSummary {...props} />
      );
    default:
      return null;
  }
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
    availableFilter, filterName, required, showAllSummaries, cx, getStyles, isRtl,
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
  const shouldShowSummary = availableFilter.showSummary || showAllSummaries;
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
      {shouldShowSummary && renderSummary(props)}
    </div>
  );
};

Title.propTypes = {
  filterName: PropTypes.string.isRequired,
  availableFilter: availableFilterType.isRequired,
  selectedFilter: selectedFilterType.isRequired,
  required: PropTypes.bool.isRequired,
  showAllSummaries: PropTypes.bool.isRequired,
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
  availableFilter: availableFilterType.isRequired,
  selectedFilter: selectedFilterType.isRequired,
  filterName: PropTypes.string.isRequired,
  onDeselect: PropTypes.func.isRequired,
  showAllSummaries: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cx: PropTypes.func.isRequired,
  getStyles: PropTypes.func.isRequired,
  isRtl: PropTypes.bool.isRequired,
};
