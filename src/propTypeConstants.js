import PropTypes from 'prop-types';
import * as constants from './constants';

const option = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string,
});

export const optionsType = PropTypes.arrayOf(
  option,
);

export const selectedOptionsType = PropTypes.oneOfType([
  PropTypes.arrayOf(
    option,
  ),
  option,
]);

export const filterTypesPropType = PropTypes.oneOf(Object.values(constants.FILTER_TYPES));

export const availableFilterType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: filterTypesPropType.isRequired,
  options: optionsType.isRequired,
  selectIsMulti: PropTypes.bool,
  showSummary: PropTypes.bool,
  required: PropTypes.bool,
});

export const selectedFilterType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  selectedOptions: selectedOptionsType.isRequired,
});
