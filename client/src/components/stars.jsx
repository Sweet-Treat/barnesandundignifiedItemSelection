import React from 'react';
import { IoIosStar, IoIosStarHalf } from 'react-icons/io';


var Stars =(props) => {
  return(
    <span>
      { props.reviews.avgRating < 0.25 && <span> <IoIosStar className="star-empty"/></span>} { props.reviews.avgRating >= 0.25 && props.reviews.avgRating < 0.75 && <span> <IoIosStarHalf className="star" /> </span>} {props.reviews.avgRating >= 0.75 && <span> <IoIosStar className="star" /> </span>}

      { props.reviews.avgRating < 1.25 && <span> <IoIosStar className="star-empty"/></span>} { props.reviews.avgRating >= 1.25 &&  props.reviews.avgRating < 1.75 && <span> <IoIosStarHalf className="star" /> </span>} {props.reviews.avgRating >= 1.75 && <span> <IoIosStar className="star" /> </span>}

      { props.reviews.avgRating < 2.25 && <span> <IoIosStar className="star-empty"/></span>} { props.reviews.avgRating >= 2.25 &&  props.reviews.avgRating < 2.75 && <span> <IoIosStarHalf className="star" /> </span>} {props.reviews.avgRating >= 2.75 && <span> <IoIosStar className="star" /> </span>}

      { props.reviews.avgRating < 3.25 && <span> <IoIosStar className="star-empty"/></span>} { props.reviews.avgRating >= 3.25 && props.reviews.avgRating < 3.75 && <span> <IoIosStarHalf className="star" /> </span>} {props.reviews.avgRating >= 3.75 && <span> <IoIosStar className="star" /> </span>}

      { props.reviews.avgRating < 4.25 && <span> <IoIosStar className="star-empty"/></span>} { props.reviews.avgRating >= 4.25 && props.reviews.avgRating < 4.75 && <span> <IoIosStarHalf className="star" /> </span>} {props.reviews.avgRating >= 4.75 && <span> <IoIosStar className="star" /> </span>}
    </span>
  );
}

export default Stars;