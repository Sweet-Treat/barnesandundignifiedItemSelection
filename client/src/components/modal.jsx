import React from 'react';

var Modal = (props) => {
  return (
    <div className='modal-main'>
      <div>
        <span className="modal-title"> All Formats & Editions </span>
        <button onClick={props.handleAllInventoryClick}>x</button>
      </div>
    </div>
  )
}

export default Modal;