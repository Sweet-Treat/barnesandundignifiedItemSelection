import React from 'react';
import Stars from './stars.jsx';
import StarsTooltip from './starsTooltip.jsx';


var Header = (props) => {
  return (
    <div>
      <div className="book-title"> {props.titleAndAuthor.title} </div>
      <div>
        <span className="book-author">by</span>
        <span className="book-author green-text"> {props.titleAndAuthor.author} </span>
      </div>
      <div>
        <span> <Stars reviews = {props.reviews}/> </span>
        <span className="rating green-text"> {props.reviews.avgRating} ({props.reviews.totalReviews}) </span>
      </div >
      <StarsTooltip/>
      <hr class="line-separator"/>
    </div>
  );
}

export default Header;