import React, {useEffect} from 'react';
import Navbar from './Navbar';
import './App.css';
import Body from './Body';
import Login from './Login';
import SignUp from './SignUp';
import {Route} from 'react-router-dom';

export default function App() {

  return (
    <div className="App">
      <Route exact path="/" component={Navbar} />
      <Route exact path="/" component={Body} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  );
}
