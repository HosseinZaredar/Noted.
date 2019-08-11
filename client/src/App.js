import React from 'react';
import Navbar from './Navbar';
import './App.css';
import Body from './Body';
import Login from './Login';
import SignUp from './SignUp';
import Trash from './Trash';
import {Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from './util/auth';
import {UserProvider} from './contexts/UserContext';


export default function App() {


  return (
    <div className="App">
      <UserProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          {isAuthenticated() ? <Route exact path="/" render={() =>
            <div>
              <Navbar />
              <Body />
            </div>
          } /> : <Redirect to="/login" />}
          {isAuthenticated() ? <Route exact path="/trash" render={() =>
            <div>
              <Navbar />
              <Trash />
            </div>
          } /> : <Redirect to="/login" />}
        </Switch>
      </UserProvider> 
    </div>
  );
}
