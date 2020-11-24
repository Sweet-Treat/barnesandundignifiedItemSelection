import React from 'react';
import Modal from './modal.jsx';

var Options = (props) => {
  return (
    <div>
      <div className="inventory-container">
        {props.inventory.map((item, index) => {
          return (
            <div key={index} className={`${props.currentOption === index ? "inventory-selected" : "inventory-element"}`} onClick={() => {props.handleFormatClick(index)}}>
              <div>{item.name}</div>
              <div className="inventory-price">
                {
                  `$${((item.price + 0.99) * (1 - item.discount / 100)).toFixed(2)}`
                }
              </div>
            </div>
          )
        })
        }
      </div>
      <div className="view-all-inventory green-text"> View all Available Formats & Editions </div>
      <Modal/>
    </div>

  )
}

export default Options;




