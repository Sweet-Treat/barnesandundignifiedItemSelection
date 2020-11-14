import React from 'react';
import ReactDOM from 'react-dom';
import Trial from './components/trial.jsx';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    }
  }
  render() {
    return (
      <div><Trial/></div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));