import React from 'react';
import { RiTruckLine } from 'react-icons/Ri';
import { AiOutlineInfoCircle } from 'react-icons/Ai';
import {FiArrowDownCircle} from 'react-icons/Fi';
import {TiDeviceTablet} from 'react-icons/Ti';
import {BsGift} from 'react-icons/Bs';
import {BiSmile} from 'react-icons/Bi';

var Footer = ({currentOption}) => {
  return (
    <div>
      {currentOption !== 1 && <div>
        <span><RiTruckLine className="footer-truck"/></span>
        <span className="footer-text">Members save with free shipping everyday</span>
        <div className="green-text footer-details">See details</div>
      </div>}

      {currentOption === 1 && <div>
        <hr class="line-separator"/>
        <span className="footer-nook">Available on Compatible NOOK devices and the free NOOK Apps.</span>
        <AiOutlineInfoCircle className="green-text circle-info"/>
        <div>
          <span><TiDeviceTablet/></span>
          <span className="footer-nook">WANT A NOOK? </span>
          <span className="green-text footer-details-nook">Explore Now</span>
        </div>
        <div>
          <span><FiArrowDownCircle/></span>
          <span className="green-text footer-details-nook">Get Free NOOK Book Sample</span>
        </div>
        <div>
          <span><BsGift/></span>
          <span className="green-text footer-details-nook">Buy As Gift</span>
        </div>
        <div>
          <span><BiSmile/></span>
          <span className="footer-nook">LEND ME®</span>
          <span className="green-text footer-details-nook">See Details</span>
        </div>
      </div>}
    </div>
  )
}

export default Footer;