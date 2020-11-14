import React from 'react';
import ReactDOM from 'react-dom';
import Trial from './components/trial.jsx';
import Header from './components/header.jsx';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    }
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