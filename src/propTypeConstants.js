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
