import React from 'react';

var Header = () => {
  return (
    <div>
      <div className="book-title"> book title </div>
      <div>
        <span>by</span>
        <span className="book-author green-text"> FirstName LastName </span>
      </div>
      <div> stars will be here </div> <div> average nd number will be here </div>
    </div>
  );
}

export default Header;