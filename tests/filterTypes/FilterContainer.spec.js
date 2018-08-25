import expect, { createSpy } from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { shallow } from 'enzyme';

import Filter from '../../src/FilterRoot';
import FilterContainer, {
  Title, RemoveButton, filterContainerCSS, titleContainerCSS,
} from '../../src/filterTypes/FilterContainer';
import classNames from '../../src/utils';

describe('FilterContainer', () => {
  it('contains Title', () => {
    const filterContainer = shallow(<FilterContainer
      filterName="name"
      onDeselect={() => {}}
      getStyles={() => {}}
      cx={() => {}}
    />);
    expect(filterContainer.find(Title).exists()).toEqual(true);
  });

  it('uses isRtl prop', () => {
    expect(filterContainerCSS({ isRtl: false }).direction).toEqual(null);
    expect(filterContainerCSS({ isRtl: true }).direction).toEqual('rtl');
  });

  describe('Title', () => {
    it('displays remove button for non-required filters', () => {
      const title = shallow(<Title
        filterName="name"
        onDeselect={() => {}}
        getStyles={() => {}}
        cx={() => {}}
      />);
      expect(title.find(RemoveButton).exists()).toEqual(true);
    });

    it('title container uses isRtl prop', () => {
      expect(titleContainerCSS({ isRtl: false }).direction).toEqual(null);
      expect(titleContainerCSS({ isRtl: true }).direction).toEqual('rtl');
    });

    it('uses isRtl', () => {
      const title = shallow(<Title
        filterName="name"
        isRtl
        onDeselect={() => {}}
        getStyles={() => {}}
        cx={classNames.bind(null, 'title')} // eslint-disable-line react/jsx-no-bind
      />);
      expect(title.hasClass('title--is-rtl')).toEqual(true);
    });

    it('does not display remove button for required filters', () => {
      const title = shallow(<Title
        filterName="name"
        required
        onDeselect={() => {}}
        getStyles={() => {}}
        cx={() => {}}
      />);
      expect(title.find(RemoveButton).exists()).toEqual(false);
    });
  });
  describe('RemoveButton', () => {
    it('has type button', () => {
      const removeButton = shallow(<RemoveButton
        filterName="name"
        onDeselect={() => {}}
        cx={() => {}}
      />);
      expect(removeButton.props().type).toEqual('button');
    });

    it('uses isRtl', () => {
      const removeButton = shallow(<RemoveButton
        filterName="name"
        isRtl
        onDeselect={() => {}}
        cx={classNames.bind(null, 'remove')} // eslint-disable-line react/jsx-no-bind
      />);
      expect(removeButton.hasClass('remove--is-rtl')).toEqual(true);
    });
  });

  it('removes deselected filters', () => {
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
    filter.find('#gender').simulate('deselect');
    expect(spy).toHaveBeenCalledWith([{ name: 'name', selectedOptions: [{ value: 'Emmett', label: 'Emmett' }] }, { name: 'age', selectedOptions: [] }]);
  });
});
