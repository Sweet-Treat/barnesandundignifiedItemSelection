import React from 'react';

import axios from 'axios';

import Options from './options.jsx';
import Modal from './modal.jsx';


class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.handleAllInventoryClick = this.handleAllInventoryClick.bind(this);
  }

  handleAllInventoryClick() {
    this.setState({
      showModal: !this.state.showModal
    })
    console.log('state', this.state);
    console.log('button has been clicked');
  }

  render() {
    return (
      <div>
        <div className ="name-type"> {this.props.currentName} </div>
        <div>
          <span className ="price"> ${ this.props.currentDiscount === 0 ? `${this.props.regularPrice}.99` : ((this.props.regularPrice + 0.99) * (1 - this.props.currentDiscount / 100)).toFixed(2)} </span>

          {this.props.currentDiscount !== 0 &&
          <span>
            <span className ="price-regular"> ${this.props.regularPrice}.99</span>
            <span className ="price-pipe"> | </span>

            <span className ="percentage-discount"> Save {this.props.currentDiscount}% </span>
          </span>}
          <div>
            <Options inventory = {this.props.inventory} currentOption = {this.props.currentOption} handleFormatClick={this.props.handleFormatClick} handleAllInventoryClick={this.handleAllInventoryClick}/>
            {this.state.showModal && <Modal className="modal display-block" inventory={this.props.inventory} titleAndAuthor={this.props.titleAndAuthor} handleAllInventoryClick={this.handleAllInventoryClick}/>}
          </div>
        </div>
      </div>
    )
  }

}

export default Inventory;