import React from 'react';
import { IoIosStar } from 'react-icons/io';

var ProgressBar = (props) => {
  return (
    <div className ="progress-bar-wrapper">
      <div>{props.rating.stars}</div>
        <div> <IoIosStar className="star" /> </div>
          <div className="progress-bar">
            <div className="filler" style={{ width: `${props.rating.percentage}%` }}></div>
        </div>
      <div>  {props.rating.numberReviews}</div>
    </div>
  )
}

export default ProgressBar;