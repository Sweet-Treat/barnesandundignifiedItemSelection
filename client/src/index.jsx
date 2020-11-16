import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Trial from './components/trial.jsx';
import Header from './components/header.jsx';
<<<<<<< HEAD
import Inventory from './components/inventory.jsx';
=======
import Radiobuttons from './components/radiobuttons.jsx';
import axios from 'axios';
>>>>>>> add a stateless radiobutton component

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      titleAndAuthor: {},
      reviews: {}
    }
    this.getTitleAndAuthor = this.getTitleAndAuthor.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  getTitleAndAuthor(isbn) {
    axios({
      method: 'get',
      url: `/product/${isbn}`
    })
    .then((data) => {
      //console.log('this is product data ', data);
      this.setState({
        titleAndAuthor: data.data
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios title get request: err ', err)
    })
  }

  getReviews(isbn) {
    axios({
      method: 'get',
      url: `/reviewssummary/${isbn}`
    })
    .then((data) => {
      //console.log('this is reviews data ', data);
      this.setState({
        reviews: data.data
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios reviews get request: err ', err)
    })
  }

  componentDidMount() {
    var isbn = 16;
    this.getTitleAndAuthor(isbn);
    this.getReviews(isbn);
  }


  render() {
    return (
      <div>
        <div><Header titleAndAuthor = {this.state.titleAndAuthor} reviews = {this.state.reviews}/></div>
        <div><Inventory/></div>
        <div><Radiobuttons/></div>
        <div><Trial/></div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));