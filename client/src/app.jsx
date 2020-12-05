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
      regularPrice: 999,
      currentDiscount: 999,
      currentStoreAvailability: true,
      titleAndAuthor: {},
      reviews: {
        starsEach: []
      }
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
      <div className ="overall-wrapper">
        <img className="book-picture-main" src="book_thumbnail.jpg" alt="book thumbnail here" width="280"/>
        <div>
          <div><Header titleAndAuthor = {this.state.titleAndAuthor} reviews = {this.state.reviews}/></div>
          <div><Inventory inventory={this.state.inventory} currentOption={this.state.currentOption} currentName={this.state.currentName} regularPrice={this.state.regularPrice} currentDiscount={this.state.currentDiscount} titleAndAuthor ={this.state.titleAndAuthor} handleFormatClick={this.handleFormatClick}/></div>
          <div><Radiobuttons currentName={this.state.currentName} currentStoreAvailability={this.state.currentStoreAvailability} /></div>
          <div><Footer currentOption={this.state.currentOption}/></div>
        </div>
      </div>
    );
  }
}

export default App;