import React from 'react';

var Header = () => {
  return (
    <div>
      <div className="book-title"> book title </div>
      <div>
        <span className="book-author">by</span>
        <span className="book-author green-text"> FirstName LastName </span>
      </div>
      <div>
        <span> stars Component </span>
        <span className="rating green-text"> average rating | numb reviews </span>
      </div>
    </div>
  );
}

export default Header;