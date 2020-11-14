import React from 'react';
import { IoIosStar, IoIosStarHalf } from 'react-icons/Io';


class Stars extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      rating: 3.3
    }
  }
  render() {
    return(
      <span>
        { this.state.rating < 0.25 && <span> <IoIosStar className="star-empty"/></span>} { this.state.rating >= 0.25 && this.state.rating < 0.75 && <span> <IoIosStarHalf className="star" /> </span>} {this.state.rating >= 0.75 && <span> <IoIosStar className="star" /> </span>}

        { this.state.rating < 1.25 && <span> <IoIosStar className="star-empty"/></span>} { this.state.rating >= 1.25 &&  this.state.rating < 1.75 && <span> <IoIosStarHalf className="star" /> </span>} {this.state.rating >= 1.75 && <span> <IoIosStar className="star" /> </span>}

        { this.state.rating < 2.25 && <span> <IoIosStar className="star-empty"/></span>} { this.state.rating >= 2.25 &&  this.state.rating < 2.75 && <span> <IoIosStarHalf className="star" /> </span>} {this.state.rating >= 2.75 && <span> <IoIosStar className="star" /> </span>}

        { this.state.rating < 3.25 && <span> <IoIosStar className="star-empty"/></span>} { this.state.rating >= 3.25 && this.state.rating < 3.75 && <span> <IoIosStarHalf className="star" /> </span>} {this.state.rating >= 3.75 && <span> <IoIosStar className="star" /> </span>}

        { this.state.rating < 4.25 && <span> <IoIosStar className="star-empty"/></span>} { this.state.rating >= 4.25 && this.state.rating < 4.75 && <span> <IoIosStarHalf className="star" /> </span>} {this.state.rating >= 4.75 && <span> <IoIosStar className="star" /> </span>}
      </span>
    );
  }
}

export default Stars;