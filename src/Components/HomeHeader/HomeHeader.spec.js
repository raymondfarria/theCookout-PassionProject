import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import HomeHeader from './index';

describe('HomeHeader', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeHeader />);
  })

  it('Header should render', () => {
    expect(wrapper).to.have.length(1);
  });

  it('Header should render both TrackSearch and UserDetails', () => {
    const wrapper = shallow(<HomeHeader />);
    expect(wrapper.children()).to.have.length(2);
  });

});