import React from 'react';
import { IoIosStar } from 'react-icons/Io';
import ProgressBar from './progressBar.jsx';

class StarsTooltip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rating5: {
        stars: 5,
        percentage: 20,
        numberReviews: 4
      },
      rating4: {
        stars: 4,
        percentage: 40,
        numberReviews: 6
      },
      rating3: {
        stars: 3,
        percentage: 60,
        numberReviews: 9
      },
      rating2: {
        stars: 2,
        percentage: 80,
        numberReviews: 10
      },
      rating1: {
        stars: 1,
        percentage: 90,
        numberReviews: 32
      },
    }
  }


  render(){
    return(
      <div className ="tooltip-wrapper">
        <ProgressBar rating ={this.state.rating5}/>
        <ProgressBar rating ={this.state.rating4}/>
        <ProgressBar rating ={this.state.rating3}/>
        <ProgressBar rating ={this.state.rating2}/>
        <ProgressBar rating ={this.state.rating1}/>
      </div>
    )
  }
}

export default StarsTooltip;