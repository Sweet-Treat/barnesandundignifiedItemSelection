import React from 'react';
import { IoIosStar } from 'react-icons/Io';

var ProgressBar = (props) => {
  return (
    <div>
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