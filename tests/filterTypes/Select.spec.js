import expect, { createSpy } from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { shallow } from 'enzyme';
import ReactSelect from 'react-select';

import Filter from '../../src/FilterRoot';
import Select, { SelectSummary, summaryCSS } from '../../src/filterTypes/Select';

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

  describe('SelectSummary', () => {
    it('shows summary for multiselect', () => {
      const selectSummary = shallow(
        <SelectSummary
          availableFilter={{ name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] }}
          selectedFilter={{}}
          cx={() => {}}
        />,
      );
      expect(selectSummary.text()).toEqual('0/2');
    });
    it('shows summary for multiselect with selected option', () => {
      const selectSummary = shallow(
        <SelectSummary
          availableFilter={{ name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] }}
          selectedFilter={{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }}
          cx={() => {}}
        />,
      );
      expect(selectSummary.text()).toEqual('1/2');
    });
    it('shows summary for single select with selected option', () => {
      const selectSummary = shallow(
        <SelectSummary
          availableFilter={{ name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] }}
          selectedFilter={{ name: 'name', selectedOptions: { value: 'Emmett', label: 'Emmett' } }}
          cx={() => {}}
        />,
      );
      expect(selectSummary.text()).toEqual('1/2');
    });
    it('has margin if not required, as there is a remove button to have a space between', () => {
      const css = summaryCSS({
        availableFilter: {
          name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
        },
        selectedFilter: { name: 'name', selectedOptions: { value: 'Emmett', label: 'Emmett' } },
        cx: () => {},
      });
      expect(css.marginRight).toEqual('10px');
    });
    it('has no margin if required, as there is no remove button to have a space between', () => {
      const css = summaryCSS({
        availableFilter: {
          name: 'name', type: 'select', required: true, options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
        },
        selectedFilter: { name: 'name', selectedOptions: { value: 'Emmett', label: 'Emmett' } },
        cx: () => {},
      });
      expect(css.marginRight).toEqual('0px');
    });
    it('uses isRtl prop', () => {
      expect(summaryCSS({ isRtl: false, availableFilter: {} }).direction).toEqual(null);
      expect(summaryCSS({ isRtl: true, availableFilter: {} }).direction).toEqual('rtl');
    });
  });
});
