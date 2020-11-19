import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

//import App from '../client/src/app.jsx'
import Trial from '../client/src/components/trial.jsx'
import Header from '../client/src/components/header.jsx'
//import Stars from '../client/src/components/stars.jsx'
import Inventory from '../client/src/components/inventory.jsx'


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

// test for the App Component
// describe('The App component render all the child components', () => {
//   it('should have a Header Component' , () => {
//     const wrapper = mount(<App/>);
//     expect(wrapper.find(Header).length).toEqual(1);
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


// inventory component - should have name, price and discount
describe('Test the inventory component', () => {
  var inventory, currentOption, currentName, regularPrice, currentDiscount, handleFormatClick, wrapper;

  beforeEach(() => {
    inventory = [
      {
        name: 'Hardcover',
        price: 31,
        discount: 5,
        buyOnlinePickUpInStore: true
      },
      {
        name: "Nook Book",
        price: 7,
        discount: 8,
        buyOnlinePickUpInStore: false
      }
    ];
    currentOption = 0;
    currentName = 'Hardcover';
    regularPrice = 31;
    currentDiscount = 5;
    handleFormatClick = spy();

    wrapper = shallow(<Inventory inventory={inventory} currentOption={currentOption} currentName={currentName} regularPrice = {regularPrice} currentDiscount={currentDiscount} handleFormatClick={handleFormatClick}/>);
  });

  it('it should have a price', () => {
    expect(wrapper.find('.price')).toHaveLength(1);
  })

  it('it should have a price before discount', () => {
    expect(wrapper.find('.price-regular')).toHaveLength(1);
  })

  it('it should have a discount percentage', () => {
    expect(wrapper.find('.percentage-discount')).toHaveLength(1);
  })
})
