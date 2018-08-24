import React from 'react';
import PropTypes from 'prop-types';

export default function FilterContainer({ filterName, children, required }) {
  return (
    // TODO A remove button if not required.
    // TODO A required asterix if required.
    <div key={filterName} id={filterName}>
      {filterName}
      {required}
      {children}
    </div>
  );
}

FilterContainer.propTypes = {
  filterName: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
