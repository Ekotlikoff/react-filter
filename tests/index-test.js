import expect from 'expect'
import React from 'react'
import {renderToStaticMarkup as render} from 'react-dom/server'

import Filter from 'src/Filter'

describe('Filter', () => {
  it('displays a div', () => {
    expect(render(<Filter/>)).toContain('<div')
  })
})
