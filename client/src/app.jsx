import React from 'react';

import axios from 'axios';

import Trial from './components/trial.jsx';
import Header from './components/header.jsx';
import Inventory from './components/inventory.jsx';
import Radiobuttons from './components/radiobuttons.jsx';
import Footer from './components/footer.jsx';
import getInventory from './lib/getInventory.js';


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      inventory: [],
      currentOption: 0,
      currentName: 'Placeholder name',
      regularPrice: 0,
      currentDiscount: 0,
      currentStoreAvailability: true,
      titleAndAuthor: {},
      reviews: {
        starsEach: []
      },
      isbn: '9780670020553'
    }
    this.getInventory = getInventory;
    this.handleFormatClick = this.handleFormatClick.bind(this);
  }

  handleFormatClick(value) {
    this.setState({
      currentOption: value,
      currentName: this.state.inventory[value].name,
      regularPrice: this.state.inventory[value].price,
      currentDiscount: this.state.inventory[value].discount,
      currentStoreAvailability: this.state.inventory[value].buyOnlinePickUpInStore
    })
  }

  componentDidMount() {
    let queryUrl = window.location.search;
    let urlParams = new URLSearchParams(queryUrl);
    let isbn = urlParams.get('isbn');
    this.setState({
      isbn: isbn
    })



//    var isbn = '9780316187183'; // <-- this should eventually change in order to render what ever is in the url and not hardcoding it
    this.getInventory(isbn, (err, data) => {
      if (err) {console.log('there was an error in the getInventory get request')}
      else {
        this.setState({
          inventory: data.data.formats,
          currentName: data.data.formats[0].name,
          regularPrice: data.data.formats[0].price,
          currentDiscount: data.data.formats[0].discount,
          currentStoreAvailability: data.data.formats[0].buyOnlinePickUpInStore,
          reviews: data.data.reviews,
          titleAndAuthor: data.data.titleAndAuthor
        })
      }
    });
  }


  render() {
    return (
      <div>
        {this.state.regularPrice !==0 && <div className ="overall-wrapper">
          <img className="book-picture-main" src={`https://fec-item-selection.s3.us-east-2.amazonaws.com/${this.state.isbn}.jpg`} alt="book thumbnail here" width="250" height="380"/>
          <div>
            <div><Header titleAndAuthor = {this.state.titleAndAuthor} reviews = {this.state.reviews}/></div>
            <div><Inventory inventory={this.state.inventory} currentOption={this.state.currentOption} currentName={this.state.currentName} regularPrice={this.state.regularPrice} currentDiscount={this.state.currentDiscount} titleAndAuthor ={this.state.titleAndAuthor} handleFormatClick={this.handleFormatClick} isbn={this.state.isbn}/></div>
            <div><Radiobuttons currentName={this.state.currentName} currentStoreAvailability={this.state.currentStoreAvailability} /></div>
            <div><Footer currentOption={this.state.currentOption}/></div>
          </div>
        </div>}
      </div>
    );
  }
}

export default App;