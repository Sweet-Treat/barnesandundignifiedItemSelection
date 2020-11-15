import React from 'react';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: 10,
      currentDiscount: 5
    }
  }

  render() {
    return (
      <div>This is an inventory component that I will start building</div>
    )
  }

}

export default Inventory;