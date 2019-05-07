import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path={`/`} component={Header}></Route>
          <Route exact path={`/`} component={Home}></Route>
          <Route path={`/`} component={Footer}></Route>
        </Router>
      </div>
    );
  }
}

export default App;