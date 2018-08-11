import React, {Component} from 'react'
import {render} from 'react-dom'

import { Filter } from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-filter Demo</h1>
      <Filter/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
