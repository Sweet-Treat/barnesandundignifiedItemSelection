import React from 'react';

import axios from 'axios';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      currentName: 'Placeholder name',
      regularPrice: 999,
      currentDiscount: 999
    }
    this.getInventory = this.getInventory.bind(this);
  }

  getInventory(isbn) {
    axios({
      method: 'get',
      url: `/getInventory/${isbn}`
    })
    .then((data) => {
      console.log('this is inventory data ', data);
      this.setState({
        inventory: data.data.options,
        currentName: data.data.options[0].name,
        regularPrice: data.data.options[0].price,
        currentDiscount: data.data.options[0].discount
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios inventory get request: err ', err)
    })
  }

  componentDidMount() {
    var isbn = 16;
    this.getInventory(isbn);
  }

  render() {
    return (
      <div>
        <div className ="name-type"> {this.state.currentName} </div>
        <div>
          <span className ="price"> ${ this.state.currentDiscount === 0 ? `${this.state.regularPrice}.99` : ((this.state.regularPrice + 0.99) * (1 - this.state.currentDiscount / 100)).toFixed(2)} </span>

          {this.state.currentDiscount !== 0 &&
          <span>
            <span className ="price-regular"> ${this.state.regularPrice}.99</span>}
            <span className ="price-pipe"> | </span>

            <span className ="percentage-discount"> Save {this.state.currentDiscount}% </span>
          </span>}
        </div>


        <div>{console.log('this.state.inventory', this.state.inventory[0])}</div>
        <div>This is an inventory component that I will start building</div>
      </div>
    )
  }

}

export default Inventory;