import React from 'react';
import ReactDOM from 'react-dom';
import Trial from './components/trial.jsx';
import Header from './components/header.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      titleAndAuthor: {},
      reviews: {},
      inventory: {},
    }
    this.getInventory = this.getInventory.bind(this);
    this.getTitleAndAuthor = this.getTitleAndAuthor.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  getInventory(isbn) {
    axios({
      method: 'get',
      url: `/getInventory/${isbn}`
    })
    .then((data) => {
      console.log('this is invetory data ', data);
    })
    .catch((err) => {
      console.log('there was an error during the axios inventory get request: err ', err)
    })
  }

  getTitleAndAuthor(isbn) {
    axios({
      method: 'get',
      url: `/product/${isbn}`
    })
    .then((data) => {
      console.log('this is product data ', data);
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
      console.log('this is reviews data ', data);
    })
    .catch((err) => {
      console.log('there was an error during the axios reviews get request: err ', err)
    })
  }

  componentDidMount() {
    var isbn = 10;
    this.getInventory(isbn);
    this.getTitleAndAuthor(isbn);
    this.getReviews(isbn);
  }


  render() {
    return (
      <div>
        <div><Header/></div>
        <div><Trial/></div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));