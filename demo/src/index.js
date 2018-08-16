/* eslint-env browser */
import React, { Component } from 'react';
import { render } from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies

import Filter from '../../src';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFilters: [] };

    this.onChange = this.onChange.bind(this);
  }

  onChange(newSelectedFilters) {
    this.setState({ selectedFilters: newSelectedFilters });
  }

  render() {
    const availableFilters = [
      {
        name: 'name', type: 'select', selectIsMulti: true, options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
      },
      {
        name: 'gender', type: 'select', options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }],
      },
    ];
    const { selectedFilters } = this.state;

    return (
      <div>
        <h1>
          react-filter Demo
        </h1>
        <Filter
          availableFilters={availableFilters}
          selectedFilters={selectedFilters}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
