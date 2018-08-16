import PropTypes from 'prop-types';

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
