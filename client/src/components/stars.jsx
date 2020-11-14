import React from 'react';

class Stars extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      rating: ''
    }
  }
  render() {
    return(
      <span>Hello from Stars</span>
    );
  }
}

export default Stars;