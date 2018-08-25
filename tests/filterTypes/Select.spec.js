import expect, { createSpy } from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { shallow } from 'enzyme';
import ReactSelect from 'react-select';

import Filter from '../../src/FilterRoot';
import Select from '../../src/filterTypes/Select';

describe('Select filter type', () => {
  it('contains react select', () => {
    const select = shallow(<Select options={[]} selectedOptions={[]} onChange={() => {}} />);
    expect(select.find(ReactSelect).exists()).toEqual(true);
  });

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
