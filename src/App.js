import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import './App.css';
// components
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
// styles
import { ThemeProvider } from '@chakra-ui/core';
import customTheme from './theme/customTheme';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute exact path='/dashboard/afternoon' component={Dashboard} />
            <PrivateRoute exact path='/dashboard/morning' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  console.log('APP STATE', state);
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {})(App);
