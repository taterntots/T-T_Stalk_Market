import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import './App.css';
// components
import Login from './components/Login';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  console.log('APP STATE', state);
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {})(App);
