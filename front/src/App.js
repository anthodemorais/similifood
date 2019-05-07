import React, { Component } from 'react';
import Router from './components/router/Router'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        </Router>
      </div>
    );
  }
}

export default App;