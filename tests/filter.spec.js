import expect, { createSpy } from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { shallow } from 'enzyme';

import Filter from '../src/Filter';

describe('Filter', () => {
  it('can render without props', () => {
    expect(render(<Filter />)).toContain('<div');
  });

  it('throws an error on unrecognized filter types', () => {
    expect(() => render(<Filter
      availableFilters={{ name: { type: 'unrecognized', options: [] } }}
      selectedFilters={{ name: [] }}
    />)).toThrow('Filter.js: Unrecognized filter type: `unrecognized`.');
  });

  it('renders filter type: select', () => {
    expect(render(<Filter
      availableFilters={{ name: { type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] } }}
      selectedFilters={{ name: [] }}
    />)).toContain('<div id="name"');
  });

  it('adds selected filters', () => {
    const spy = createSpy();
    const filter = shallow(<Filter
      availableFilters={{ name: { type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] } }}
      selectedFilters={[]}
      onChange={spy}
    />);
    filter.instance().onAddFilter({ value: 'name' });
    expect(spy).toHaveBeenCalledWith({ name: { selectedOptions: [] }});
  });
});
