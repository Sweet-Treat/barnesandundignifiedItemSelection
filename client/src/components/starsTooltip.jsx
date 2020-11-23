import React from 'react';
import { IoIosStar } from 'react-icons/Io';

class StarsTooltip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      percentage5: 20
    }
  }


  render(){
    return(
      <div className ="tooltip-wrapper">
          <div>5</div>
          <div> <IoIosStar className="star" /> </div>
          <div className="progress-bar">
            <div className="filler" style={{ width: `${this.state.percentage5}%` }}></div>
          </div>
          <div>25</div>
      </div>
    )
  }
}

export default StarsTooltip;