import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

var Radiobuttons = (props) => {
  return(
    <div>
      {props.currentName !== "Nook Book" && <div>
        <div>
          <label className="radio-container">
            <input type="radio" name="selection" defaultChecked/>
            <span>Ship This Item - </span>
            <span className="radio-container-bold">Qualifies for Free Shipping </span>
            <AiOutlineInfoCircle className="green-text circle-info"/>
          </label>
        </div>
        <div>
          {props.currentStoreAvailability && <label className="radio-container">
            <input type="radio" name="selection"/>
            <span>Buy Online, Pick in Store at </span>
            <span className="radio-container-bold">B&N Bay Street - Emeryville </span>
            <AiOutlineInfoCircle className="green-text circle-info"/>
          </label>}
          {!props.currentStoreAvailability && <label className="radio-container-gray-out">
            <input type="radio" name="selection" disabled="true"/>
            <span>Unavailable for pickup at </span>
            <span className="radio-container-bold">B&N Bay Street - Emeryville </span>
            <AiOutlineInfoCircle className="green-text circle-info"/>
          </label>}
          <div className="green-text availability">Check Availability at Nearby Stores</div>
        </div>
      </div>}
      <div className="button-container">
        <input type="submit" value="ADD TO CART" className="add-to-cart"/>
        <input type="submit" value="Sign in to Purchase Instantly" className="sign-in"/>
      </div>
    </div>
  )
}

export default Radiobuttons;