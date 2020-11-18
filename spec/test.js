import React from 'react';
import { shallow, mount } from 'enzyme';

import Trial from '../client/src/components/trial.jsx'
import Header from '../client/src/components/header.jsx'
import Stars from '../client/src/components/stars.jsx'


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


// describe('Trial test', () => {
//   it('should have text in a div', () => {
//     const wrapper = shallow(<Trial/>);
//     expect(wrapper.text()).toBe('Hello from React from Trial');
//   })
// })

describe('Test for header component', () => {
  var titleAndAuthor, reviews, wrapper;

  beforeEach(() => {
    titleAndAuthor = {
      title: 'The Stranger',
      author: 'Albert Camus'
    };
    reviews = {
      avgRating: 4.97,
      totalReviews: 348
    };
    wrapper = shallow(<Header titleAndAuthor={titleAndAuthor} reviews={reviews}/>);
  });

  it('a title should exist', () => {
    expect(wrapper.find('.book-title')).toHaveLength(1);
  })
  it('an author should exist', () => {
    expect(wrapper.find('.book-author')).toHaveLength(2);
  });
})
