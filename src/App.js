import React from 'react';
import Navbar from './Navbar';

import './App.css';
import Body from './Body';


export default function App() {

  var title = 'Title';
  
  return (
    <div className="App">
      <Navbar />
      <Body />
    </div>
  );
}
