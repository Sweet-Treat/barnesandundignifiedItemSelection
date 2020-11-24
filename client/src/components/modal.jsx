import React from 'react';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: 0
    }
  }

  render(){
    return(
    <div className='modal-main'>
      <div>
        <span className="modal-title"> All Formats & Editions </span>
        <button onClick={this.props.handleAllInventoryClick}>x</button>
      </div>
      <div>
        {
          this.props.inventory.map((item, index) => {
          return (<span className={`${this.state.currentFormat === index ? "modal-format-selected" : "modal-format"}`}>{item.name}</span>)
          })
        }
      </div>
      <div className="modal-information-wrapper">
        <div className="modal-information-children">Here is where the book picture thumbnail will go</div>
        <div className="modal-information-children">
          <div>Title</div>
          <div>Pub Date</div>
          <div>Pub Date</div>
          <div>Product Details</div>
        </div>
        <div className="modal-information-children">
          <div>Add TO CART BUTTON</div>
          <div>Add to Wishlist</div>
        </div>
      </div>
    </div>
    )
  }
}

export default Modal;