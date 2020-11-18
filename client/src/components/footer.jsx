import React from 'react';
import { RiTruckLine } from 'react-icons/Ri';

var Footer = () => {
  return (
    <div>
      <span><RiTruckLine className="footer-truck"/></span>
      <span className="footer-text">Members save with free shipping everyday</span>
      <div className="green-text footer-details">See details</div>
    </div>
  )
}

export default Footer;