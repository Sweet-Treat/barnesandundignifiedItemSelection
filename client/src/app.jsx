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
      currentDiscount: this.state.inventory[value].discount
    })
    console.log('this.state.currentOption', this.state.currentOption);
  }

  componentDidMount() {
    var isbn = '9781524763169';
    this.getInventory(isbn, (err, data) => {
      if (err) {console.log('there was an error in the getInventory get request')}
      else {
        this.setState({
          inventory: data.data.formats,
          currentName: data.data.formats[0].name,
          regularPrice: data.data.formats[0].price,
          currentDiscount: data.data.formats[0].discount,
          reviews: data.data.reviews,
          titleAndAuthor: data.data.titleAndAuthor
        })
      }
    });
  }


  render() {
    return (
      <div>
        <div><Header titleAndAuthor = {this.state.titleAndAuthor} reviews = {this.state.reviews}/></div>
        <div><Inventory inventory={this.state.inventory} currentOption={this.state.currentOption} currentName={this.state.currentName} regularPrice={this.state.regularPrice} currentDiscount={this.state.currentDiscount} handleFormatClick={this.handleFormatClick}/></div>
        <div><Radiobuttons/></div>
        <div><Footer currentOption={this.state.currentOption}/></div>
      </div>
    );
  }
}

export default App;