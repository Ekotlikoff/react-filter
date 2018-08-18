import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import expect from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { containerCSS, FilterContainer } from '../src/FilterContainer';
import classNames from '../src/utils';

describe('FilterContainer', () => {
  it('uses className prop', () => {
    const filterContainer = shallow(<FilterContainer className="container-class" getStyles={() => {}} cx={classNames.bind(null, '')} />); // eslint-disable-line react/jsx-no-bind
    expect(filterContainer.hasClass('container-class')).toEqual(true);
  });

  it('uses cx prop to include inner classnames', () => {
    const filterContainer = shallow(<FilterContainer isDisabled className="container-class" getStyles={() => {}} cx={classNames.bind(null, 'inner')} />); // eslint-disable-line react/jsx-no-bind
    expect(filterContainer.hasClass('inner--is-disabled')).toEqual(true);
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
