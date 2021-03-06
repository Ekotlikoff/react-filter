import expect, { createSpy } from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import { shallow } from 'enzyme';

import Filter from '../src/FilterRoot';
import Select from '../src/filterTypes/Select';

describe('Filter', () => {
  it('can render without props', () => {
    expect(render(<Filter />)).toContain('<div');
  });

  it('throws error if missing onChange', () => {
    const availableFilters = [{ name: 'gender', type: 'select', options: [] }];
    const filter = shallow(<Filter />);
    expect(() => filter.instance().initializeRequiredFilters(availableFilters)).toThrow(/No onChange provided/);
  });

  describe('Required filter handling', () => {
    const availableFiltersWithRequired = [
      {
        name: 'name', type: 'select', required: true, options: [],
      },
      {
        name: 'hair color', type: 'select', required: true, options: [],
      },
      { name: 'gender', type: 'select', options: [] },
    ];
    it('calls onChange with statically provided required filters', () => {
      const spy = createSpy();
      const filter = shallow(
        <Filter onChange={spy} availableFilters={availableFiltersWithRequired} />,
      );
      expect(spy).toHaveBeenCalledWith(
        [{ name: 'name', selectedOptions: [] }, { name: 'hair color', selectedOptions: [] }],
      );
      expect(filter.state().requiredFiltersInitialized).toEqual(true);
    });

    it('calls onChange with newly loaded required filters', () => {
      const spy = createSpy();
      const filter = shallow(<Filter onChange={spy} availableFilters={[]} />);
      filter.setProps({ availableFilters: availableFiltersWithRequired });
      expect(spy).toHaveBeenCalledWith(
        [{ name: 'name', selectedOptions: [] }, { name: 'hair color', selectedOptions: [] }],
      );
    });

    it('calls onChange with updated required filters', () => {
      const spy = createSpy();
      const filter = shallow(
        <Filter onChange={spy} availableFilters={availableFiltersWithRequired} />,
      );
      expect(spy).toHaveBeenCalledWith(
        [{ name: 'name', selectedOptions: [] }, { name: 'hair color', selectedOptions: [] }],
      );
      filter.setProps({ availableFilters: availableFiltersWithRequired.filter(f => f.name !== 'name') });
      expect(spy).toHaveBeenCalledWith(
        [{ name: 'hair color', selectedOptions: [] }],
      );
    });

    it('does not call onChange when selectedFilters are updated', () => {
      const spy = createSpy();
      const filter = shallow(
        <Filter
          onChange={spy}
          availableFilters={availableFiltersWithRequired.map(f => ({ ...f, required: false }))}
        />,
      );
      expect(spy).toHaveBeenCalled();
      filter.setProps({ selectedFilters: [{ name: 'name', selectedOptions: [] }] });
      expect(spy.calls.length).toEqual(1);
    });
  });

  it('throws an error on unrecognized filter types', () => {
    expect(() => render(<Filter
      availableFilters={[{ name: 'name', type: 'unrecognized', options: [] }]}
      selectedFilters={[{ name: 'name', selectedOptions: [] }]}
    />)).toThrow('Filter.js: Unrecognized filter type: `unrecognized`.');
  });

  it('renders filter type: select', () => {
    const filter = shallow(<Filter
      availableFilters={[{ name: 'name', type: 'select', options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }] }]}
      selectedFilters={[{ name: 'name', selectedOptions: [] }]}
      onChange={() => {}}
    />);
    expect(filter.find('#name').exists()).toEqual(true);
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
      filter.find('#name').find(Select).simulate(
        'change',
        [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
      );
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
      filter.find('#name').find(Select).simulate(
        'change',
        [{ value: 'Jacob', label: 'Jacob' }],
      );
      expect(spy).toHaveBeenCalledWith([
        { name: 'name', selectedOptions: [{ value: 'Jacob', label: 'Jacob' }] },
        { name: 'age', selectedOptions: [{ value: 'twenty four', label: 'twenty four' }] },
        { name: 'gender', selectedOptions: [] },
      ]);
    });
  });

  describe('Select filter type', () => {
    it('passes isMulti to child react-select, and defaults to false', () => {
      const spy = createSpy();
      const filter = shallow(<Filter
        availableFilters={[
          {
            name: 'name', type: 'select', selectIsMulti: true, options: [{ value: 'Emmett', label: 'Emmett' }, { value: 'Jacob', label: 'Jacob' }],
          },
          { name: 'age', type: 'select', options: [{ value: 'twenty four', label: 'twenty four' }] },
        ]}
        selectedFilters={[{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, { name: 'age', selectedOptions: [] }]}
        onChange={spy}
      />);
      expect(filter.find('#age').find(Select).props().isMulti).toBeFalsy();
      expect(filter.find('#name').find(Select).props().isMulti).toBeTruthy();
    });
  });

  describe('Styles', () => {
    it('can incorporate custom styles', () => {
      const propsWithCustomStyles = { styles: { input: base => ({ ...base, marginLeft: '10px' }) } };
      const filter = shallow(<Filter {...propsWithCustomStyles} />);
      const customStyles = filter.instance().getStyles('input', propsWithCustomStyles);
      expect(customStyles.marginLeft).toEqual('10px');
      expect(customStyles.position).toEqual('relative');
    });

    it('can override default styles', () => {
      const propsWithCustomStyles = { styles: { input: () => ({ marginLeft: '10px' }) } };
      const filter = shallow(<Filter {...propsWithCustomStyles} />);
      const customStyles = filter.instance().getStyles('input', propsWithCustomStyles);
      expect(customStyles.marginLeft).toEqual('10px');
      expect(customStyles.position).toEqual(null);
    });

    it('can override default styles for multiple keys', () => {
      const propsWithCustomStyles = { styles: { input: () => ({ marginLeft: '10px' }), container: base => ({ ...base, marginLeft: '10px' }) } };
      const filter = shallow(<Filter {...propsWithCustomStyles} />);
      const customStylesInput = filter.instance().getStyles('input', propsWithCustomStyles);
      const customStylesContainer = filter.instance().getStyles('container', propsWithCustomStyles);
      expect(customStylesInput.marginLeft).toEqual('10px');
      expect(customStylesInput.marginBottom).toEqual(null);
      expect(customStylesContainer.position).toEqual('relative');
      expect(customStylesContainer.marginLeft).toEqual('10px');
    });
  });
});
