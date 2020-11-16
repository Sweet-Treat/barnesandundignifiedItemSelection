import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/Ai';

var Radiobuttons = () => {
  return(
    <div>

        <div>
          <label className="radio-container">
            <input type="radio" name="selection" checked/>
            <span>Ship This Item - </span>
            <span className="radio-container-bold">Qualifies for Free Shipping </span>
            <AiOutlineInfoCircle className="green-text circle-info"/>
          </label>
        </div>
        <div>
          <label className="radio-container">
            <input type="radio" name="selection"/>
            <span>Buy Online, Pick in Store at </span>            <span className="radio-container-bold">B&N Bay Street - Emeryville </span>
            <AiOutlineInfoCircle className="green-text circle-info"/>
          </label>
          <div className="green-text availability">Check Availability at Nearby Stores</div>
        </div>

    </div>
  )
}

export default Radiobuttons;