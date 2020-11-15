import React from 'react';

import axios from 'axios';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      currentName: 'Placeholder name',
      currentPrice: 999,
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
        currentPrice: data.data.options[0].price,
        currentDiscount: data.data.options[0].discount
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios inventory get request: err ', err)
    })
  }

  componentDidMount() {
    var isbn = 10;
    this.getInventory(isbn);
  }

  render() {
    return (
      <div>
        <div className ="name-type"> {this.state.currentName} </div>
        <div>
          <span className ="price-regular"> ${this.state.currentPrice}.99 </span>
          <span className ="price-discount"> ${Math.round(this.state.currentPrice * (1 - this.state.currentDiscount / 100))}.99</span>
          <span className ="price-pipe"> | </span>
    <span className ="percentage-discount"> Save {this.state.currentDiscount}% </span>
        </div>


        <div>{console.log('this.state.inventory', this.state.inventory[0])}</div>
        <div>This is an inventory component that I will start building</div>
      </div>
    )
  }

}

export default Inventory;