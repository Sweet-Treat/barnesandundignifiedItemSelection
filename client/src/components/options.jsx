import React from 'react';


var Options = (props) => {
  return (
    <div>
      <div className="inventory-container">
        {props.inventory.map((item, index) => {
          return (
            <div className={`${props.currentOption === index ? "inventory-selected" : "inventory-element"}`}>
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
    </div>

  )
}

export default Options;




