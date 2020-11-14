import React from 'react';
import ReactDOM from 'react-dom';
import Trial from './components/trial.jsx';
import Header from './components/header.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      bookInfo: {}
    }
    this.getBookInfo = this.getBookInfo.bind(this);
  }

  getBookInfo(isbn) {
    console.log('isbn ', isbn)
    axios({
      method: 'get',
      url: `/${isbn}`
    })
    .then((data) => {
      console.log('this is what came back: data ', data);
    })
    .catch((err) => {
      console.log('there was an error during the axios get request: err ', err)
    })
  }

  componentDidMount() {
    this.getBookInfo(259);
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