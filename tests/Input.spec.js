import expect from 'expect'; // eslint-disable-line import/no-extraneous-dependencies
import { inputCSS } from '../src/Input';

describe('Input', () => {
  it('uses isRtl prop', () => {
    expect(inputCSS({ isRtl: false }).direction).toEqual(null);
    expect(inputCSS({ isRtl: true }).direction).toEqual('rtl');
  });

  it('uses isDisabled prop', () => {
    expect(inputCSS({ isDisabled: false }).pointerEvents).toEqual(null);
    expect(inputCSS({ isDisabled: true }).pointerEvents).toEqual('none');
  });
});
