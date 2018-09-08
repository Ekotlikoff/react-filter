import expect, { createSpy } from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { shallow } from 'enzyme';

import Filter from '../../src/FilterRoot';
import { SelectSummary } from '../../src/filterTypes/Select';
import FilterContainer, {
  Title, RemoveButton, filterContainerCSS, titleContainerCSS,
} from '../../src/filterTypes/FilterContainer';
import classNames from '../../src/utils';
import { FILTER_TYPES } from '../../src/constants';

describe('FilterContainer', () => {
  const commonProps = {
    filterName: 'name',
    availableFilter: { },
    onDeselect: () => {},
    getStyles: () => {},
    cx: () => {},
  };
  it('contains Title', () => {
    const filterContainer = shallow(<FilterContainer {...commonProps} />);
    expect(filterContainer.find(Title).exists()).toEqual(true);
  });

  it('uses isRtl prop', () => {
    expect(filterContainerCSS({ isRtl: false }).direction).toEqual(null);
    expect(filterContainerCSS({ isRtl: true }).direction).toEqual('rtl');
  });

  describe('Title', () => {
    it('displays remove button for non-required filters', () => {
      const title = shallow(<Title {...commonProps} />);
      expect(title.find(RemoveButton).exists()).toEqual(true);
    });

    it('title container uses isRtl prop', () => {
      expect(titleContainerCSS({ isRtl: false }).direction).toEqual(null);
      expect(titleContainerCSS({ isRtl: true }).direction).toEqual('rtl');
    });

    it('uses isRtl', () => {
      const title = shallow(<Title {...commonProps} isRtl cx={classNames.bind(null, 'title')} />); // eslint-disable-line react/jsx-no-bind
      expect(title.hasClass('title--is-rtl')).toEqual(true);
    });

    it('does not display remove button for required filters', () => {
      const title = shallow(<Title {...commonProps} required />);
      expect(title.find(RemoveButton).exists()).toEqual(false);
    });

    describe('Should show summary', () => {
      it('does not display summary without a filter type', () => {
        const title = shallow(<Title {...commonProps} showAllSummaries />);
        expect(title.find(SelectSummary).exists()).toEqual(false);
      });

      it('does not display summary without showSummary/showAllSummaries', () => {
        const title = shallow(
          <Title {...commonProps} availableFilter={{ type: FILTER_TYPES.SELECT }} />,
        );
        expect(title.find(SelectSummary).exists()).toEqual(false);
      });

      it('does display summary with showSummary and without showAllSummaries', () => {
        const title = shallow(
          <Title
            {...commonProps}
            availableFilter={{ type: FILTER_TYPES.SELECT, showSummary: true }}
          />,
        );
        expect(title.find(SelectSummary).exists()).toEqual(true);
      });

      it('does display summary without showSummary and with showAllSummaries', () => {
        const title = shallow(
          <Title
            {...commonProps}
            availableFilter={{ type: FILTER_TYPES.SELECT }}
            showAllSummaries
          />,
        );
        expect(title.find(SelectSummary).exists()).toEqual(true);
      });

      it('does display summary with showSummary and with showAllSummaries', () => {
        const title = shallow(
          <Title
            {...commonProps}
            availableFilter={{ type: FILTER_TYPES.SELECT, showSummary: true }}
            showAllSummaries
          />,
        );
        expect(title.find(SelectSummary).exists()).toEqual(true);
      });
    });
  });
  describe('RemoveButton', () => {
    it('has type button', () => {
      const removeButton = shallow(<RemoveButton {...commonProps} />);
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
