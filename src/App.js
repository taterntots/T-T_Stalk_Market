import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import './App.css';
// components
import Login from './components/Login';
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
