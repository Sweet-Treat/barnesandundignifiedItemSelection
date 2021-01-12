import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import mockAxios from "axios";
import 'regenerator-runtime/runtime';

import App from '../client/src/app.jsx';
import Header from '../client/src/components/header.jsx';
import Stars from '../client/src/components/stars.jsx';
import Inventory from '../client/src/components/inventory.jsx';
import Options from '../client/src/components/options.jsx';
import Footer from '../client/src/components/footer.jsx';
import getInventory from '../client/src/lib/getInventory.js';

describe('Test for tests', () => {
  it('should be true', () => {
    const foo = true;
    expect(foo).toBe(true);
  });
  it('should be false', () => {
    const boo = false;
    expect(boo).toBe(false);
  });
});

// test for the App Component
// describe('The App component render all the child components', () => {
//   it('should have a Header Component' , () => {
//     const wrapper = mount(<App/>);
//     expect(wrapper.find(Header).length).toEqual(1);
//   })
// })


describe('Test for Header component', () => {
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
  });
  it('an author should exist', () => {
    expect(wrapper.find('.book-author')).toHaveLength(2);
  });
});


describe('Test the Inventory component', () => {
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
  });

  it('it should have a price before discount', () => {
    expect(wrapper.find('.price-regular')).toHaveLength(1);
  });

  it('it should have a discount percentage', () => {
    expect(wrapper.find('.percentage-discount')).toHaveLength(1);
  });
});

describe('Test the Option component, a child of the Inventory component', () => {
  var inventory, currentOption, handleFormatClick, wrapper;

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
    //handleFormatClick = spy();
    handleFormatClick = jest.fn();
 //   var mockClick = jest.fn();

    wrapper = shallow(<Options inventory={inventory} currentOption={currentOption} handleFormatClick={handleFormatClick}/>);
  });

  it('should have a clickable item to see all the inventory in a pop up', () => {
    expect(wrapper.find('.view-all-inventory')).toHaveLength(1);
  });
  it('it should have two formats', () => {
    expect(wrapper.find('.inventory-price')).toHaveLength(2);
  })
//   it('clicking an option should select it', () => {
//     //var formatType = wrapper.find('.inventory-price');
//     //var formatType = wrapper.find('.inventory-selected');
//     var formatType = wrapper.find('.inventory-element');

//     //var formatType = wrapper.findWhere( (node) => { node.key() === 0 });
//     //console.log('formatType ', formatType);
//     formatType.simulate('click');

//     // formatType1.simulate('click');
//     // formatType2.simulate('click');
//     //console.log(wrapper.find('.inventory-selected')
//     expect(handleFormatClick.mock.calls.length)toEqual(1);
// //    expect(wrapper.find('.inventory-selected').render().text()).toBe('Nook Book$7.35');
//   })


});

describe('Test the Footer component, in case we have a Nook Book', () => {
  var currentOption, wrapper;

  beforeEach(() => {
    currentOption = 1;

    wrapper = shallow(<Footer currentOption={currentOption} />);
  });

  it('it should have specific Nook Book footer text', () => {
    expect(wrapper.find('.footer-nook')).toHaveLength(5);
  });
  it('it should not have general other format footer text', () => {
    expect(wrapper.find('.footer-text')).toHaveLength(0);
  })
});

describe('Test the Footer component, in case it is not a Nook Book', () => {
  var currentOption, wrapper;

  beforeEach(() => {
    currentOption = 0;

    wrapper = shallow(<Footer currentOption={currentOption} />);
  });

  it('it should have specific Nook Book footer text', () => {
    expect(wrapper.find('.footer-nook')).toHaveLength(0);
  });
  it('it should not have general other format footer text', () => {
    expect(wrapper.find('.footer-text')).toHaveLength(1);
  })
});


// make tests on App
// describe('Test on App component', () => {
//   var wrapper;

//   beforeEach(() => {
//     wrapper = shallow(<App />);
//   });

//   it('it should have a Header component', () => {
//     expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
//   });
//   it('it should have a Inventory component', () => {
//     expect(wrapper.containsMatchingElement(<Inventory />)).toEqual(true);
//   });
//   it('it should have a Footer component', () => {
//     expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
//   });
// });


// make tests on App - with lifecyle
// describe('Test on App component with lifecycle events', () => {

//   it('it calls component didMount', async () => {
//     mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {
//       "titleAndAuthor": {
//           "title": "A Promised Land",
//           "author": "Barack Obama"
//       },
//       "reviews": {
//           "totalReviews": 27,
//           "avgRating": 1.9
//       },
//       "formats": [
//           {
//               "name": "Hardcover",
//               "price": 28,
//               "discount": 4,
//               "buyOnlinePickUpInStore": false
//           },
//           {
//               "name": "Nook Book",
//               "price": 25,
//               "discount": 19,
//               "buyOnlinePickUpInStore": false
//           },
//           {
//               "name": "Audio CD",
//               "price": 17,
//               "discount": 1,
//               "buyOnlinePickUpInStore": true
//           }
//         ]
//       }
//     })
//   )
//     var result = await getInventory();
//     console.log('result', result);
//     var wrapper = shallow(<App />);
//     expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);

//     // var bookDetails = getInventory();
//     // console.log(bookDetails);

//   });
// });


// describe('Test on App component with lifecycle events', () => {

//   beforeEach( async () => {
//     mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {
//       "titleAndAuthor": {
//           "title": "A Promised Land",
//           "author": "Barack Obama"
//       },
//       "reviews": {
//           "totalReviews": 27,
//           "avgRating": 1.9
//       },
//       "formats": [
//           {
//               "name": "Hardcover",
//               "price": 28,
//               "discount": 4,
//               "buyOnlinePickUpInStore": false
//           },
//           {
//               "name": "Nook Book",
//               "price": 25,
//               "discount": 19,
//               "buyOnlinePickUpInStore": false
//           },
//           {
//               "name": "Audio CD",
//               "price": 17,
//               "discount": 1,
//               "buyOnlinePickUpInStore": true
//           }
//       ]
//     }}))
//   });


//   it('it should have a Header component', async () => {
//    // var result = await getInventory();
//     var wrapper = shallow(<App />);
//     //expect(wrapper.state('regularPrice')).to.equal(10);
//     expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
//   });
//   it('it should have a Inventory component', async () => {
//     //var result = await getInventory();
//     var wrapper = shallow(<App />);
//     expect(wrapper.containsMatchingElement(<Inventory />)).toEqual(true);
//   });
//   it('it should have a Footer component', async () => {
//     //var result = await getInventory();
//     var wrapper = shallow(<App />);
//     expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
//   });
// });