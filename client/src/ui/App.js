/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './App.css';
import React from 'react';
import Header from './Header';
import Home from './Home';
import Login from './login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './admin/Admin';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/login" component={ Login } />
          <Route path="/admin" component={ Admin } />
        </Switch>
      </Router>
    );
  }
}

export default App;
