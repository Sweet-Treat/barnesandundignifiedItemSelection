import React from 'react';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: ''
    }
  }

  render(){
    return(
    <div className='modal-main'>
      <div>
        <span className="modal-title"> All Formats & Editions </span>
        <button onClick={this.props.handleAllInventoryClick}>x</button>
      </div>
    </div>
    )
  }
}

export default Modal;