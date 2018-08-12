import React, {Component} from 'react'
import {render} from 'react-dom'

import { Filter } from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFilters: {} };

    this.onChange = this.onChange.bind(this);
  }

  onChange(newSelectedFilters) {
    this.setState({ selectedFilters: newSelectedFilters });
  }

  render() {
    const availableFilters = { name: { type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] } };

    return <div>
      <h1>react-filter Demo</h1>
      <Filter
        availableFilters={availableFilters}
        selectedFilters={this.state.selectedFilters}
        onChange={this.onChange}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
