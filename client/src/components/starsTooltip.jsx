import React from 'react';
import { IoIosStar } from 'react-icons/io';
import ProgressBar from './progressBar.jsx';

var  StarsTooltip = (props) => {
  return(
    <div className ="tooltip-wrapper">
      {props.starRating.map((item) => {
        return (
          <ProgressBar rating ={item}/>
        )
      })}
      <input type="submit" value={`Read ${props.totalReviews} reviews`} className="read-reviews"/>
    </div>
  )
}

export default StarsTooltip;