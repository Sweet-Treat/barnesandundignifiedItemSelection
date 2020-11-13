import React from 'react';
import { shallow } from 'enzyme';
import Trial from '../client/src/components/trial.jsx'

describe('Test for tests', () => {
  it('should be true', () => {
    const foo = true;
    expect(foo).toBe(true);
  });
  it('should be false', () => {
    const boo = false;
    expect(boo).toBe(false);
  })

});


describe('Trial test', () => {
  it('should have text in a div', () => {
    const wrapper = shallow(<Trial/>);
    expect(wrapper.text()).toBe('Hello from React from Trial');
  })
})
