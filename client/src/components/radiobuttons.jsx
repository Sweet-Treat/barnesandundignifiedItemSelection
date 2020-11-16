import React from 'react';

var Radiobuttons = () => {
  return(
    <div>
      <div>
        <label>
          <input type="radio" checked/>
            <span>Ship This Item - </span>
            <span>Qualifies for Free Shipping</span>
        </label>
      </div>
      <div>
        <label>
          <input type="radio"/>
            <span>Buy Online, Pick in Store at </span>
            <span>B&N Bay Street - Emeryville</span>
        </label>
      </div>
    </div>
  )
}

export default Radiobuttons;