import React from 'react';
import Navbar from './Navbar';
import './App.css';
import Body from './Body';
import Login from './Login';
import SignUp from './SignUp';
import {Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from './util/auth';


export default function App() {


  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        {isAuthenticated() ? <Route exact path="/" render={() =>
          <div>
            <Navbar />
            <Body />
          </div>
        } /> : <Redirect to="/login" />}
      </Switch> 
    </div>
  );
}
