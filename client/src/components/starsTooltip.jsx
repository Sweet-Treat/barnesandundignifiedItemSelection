import React from 'react';
import { IoIosStar } from 'react-icons/Io';
import ProgressBar from './progressBar.jsx';

var  StarsTooltip = (props) => {
  return(
    <div className ="tooltip-wrapper">
      {props.starRating.map((item) => {
        return (
          <ProgressBar rating ={item}/>
        )
      })}
      {/* <ProgressBar rating ={props.reviews.rating5}/>
      <ProgressBar rating ={props.reviews.rating4}/>
      <ProgressBar rating ={props.reviews.rating3}/>
      <ProgressBar rating ={props.reviews.rating2}/>
      <ProgressBar rating ={props.reviews.rating1}/> */}
    </div>
  )
}

export default StarsTooltip;