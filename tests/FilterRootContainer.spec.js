import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import expect from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { containerCSS, FilterRootContainer } from '../src/FilterRootContainer';
import classNames from '../src/utils';

describe('FilterRootContainer', () => {
  it('uses className prop', () => {
    const FilterContainer = shallow(<FilterRootContainer className="container-class" getStyles={() => {}} cx={classNames.bind(null, '')} />); // eslint-disable-line react/jsx-no-bind
    expect(FilterContainer.hasClass('container-class')).toEqual(true);
  });

  it('uses cx prop to include inner classnames', () => {
    const FilterContainer = shallow(<FilterRootContainer isDisabled className="container-class" getStyles={() => {}} cx={classNames.bind(null, 'inner')} />); // eslint-disable-line react/jsx-no-bind
    expect(FilterContainer.hasClass('inner--is-disabled')).toEqual(true);
  });

  it('uses isRtl prop', () => {
    expect(containerCSS({ isRtl: false }).direction).toEqual(null);
    expect(containerCSS({ isRtl: true }).direction).toEqual('rtl');
  });

  it('uses isDisabled prop', () => {
    expect(containerCSS({ isDisabled: false }).pointerEvents).toEqual(null);
    expect(containerCSS({ isDisabled: true }).pointerEvents).toEqual('none');
  });
});
