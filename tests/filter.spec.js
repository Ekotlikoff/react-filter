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
      availableFilters={[{ name: 'name', type: 'unrecognized', options: [] }]}
      selectedFilters={[{ name: 'name', selectedOptions: [] }]}
    />)).toThrow('Filter.js: Unrecognized filter type: `unrecognized`.');
  });

  it('renders filter type: select', () => {
    expect(render(<Filter
      availableFilters={[{ name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] }]}
      selectedFilters={[{ name: 'name', selectedOptions: [] }]}
    />)).toContain('<div id="name"');
  });

  describe('Selected filter behavior', () => {
    it('adds newly selected filters', () => {
      const spy = createSpy();
      const filter = shallow(<Filter
        availableFilters={[{ name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] }]}
        selectedFilters={[]}
        onChange={spy}
      />);
      filter.instance().onRootChange([{ value: 'name' }]);
      expect(spy).toHaveBeenCalledWith([{ name: 'name', selectedOptions: [] }]);
    });

    it('removes deselected filters and maintains state of previously selected filter\'s options', () => {
      const spy = createSpy();
      const filter = shallow(<Filter
        availableFilters={[
          { name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] },
          { name: 'age', type: 'select', options: [{ value: 'twenty four', label: 'twenty four' }] },
          { name: 'gender', type: 'select', options: [{ value: 'male', label: 'male' }] },
        ]}
        selectedFilters={[{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, { name: 'age', selectedOptions: [] }, { name: 'gender', selectedOptions: [] }]}
        onChange={spy}
      />);
      filter.instance().onRootChange([{ value: 'name' }, { value: 'age' }]);
      expect(spy).toHaveBeenCalledWith([{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, { name: 'age', selectedOptions: [] }]);
    });
  });

  describe('Selected options behavior', () => {
    it('adds newly selected options', () => {
      const spy = createSpy();
      const filter = shallow(<Filter
        availableFilters={[
          { name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] },
          { name: 'age', type: 'select', options: [{ value: 'twenty four', label: 'twenty four' }] },
          { name: 'gender', type: 'select', options: [{ value: 'male', label: 'male' }] },
        ]}
        selectedFilters={[{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, { name: 'age', selectedOptions: [] }, { name: 'gender', selectedOptions: [] }]}
        onChange={spy}
      />);
      filter.instance().onChildChange({ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }]);
      expect(spy).toHaveBeenCalledWith([
        { name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] },
        { name: 'age', selectedOptions: [] },
        { name: 'gender', selectedOptions: [] },
      ]);
    });

    it('removes deselected options', () => {
      const spy = createSpy();
      const filter = shallow(<Filter
        availableFilters={[
          { name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] },
          { name: 'age', type: 'select', options: [{ value: 'twenty four', label: 'twenty four' }] },
          { name: 'gender', type: 'select', options: [{ value: 'male', label: 'male' }] },
        ]}
        selectedFilters={[{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, { name: 'age', selectedOptions: [{ value: 'twenty four', label: 'twenty four' }] }, { name: 'gender', selectedOptions: [] }]}
        onChange={spy}
      />);
      filter.instance().onChildChange({ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, [{ value: 'Jacob', label: 'Jacob' }]);
      expect(spy).toHaveBeenCalledWith([
        { name: 'name', selectedOptions: [{ value: 'Jacob', label: 'Jacob' }] },
        { name: 'age', selectedOptions: [{ value: 'twenty four', label: 'twenty four' }] },
        { name: 'gender', selectedOptions: [] },
      ]);
    });
  });
});
