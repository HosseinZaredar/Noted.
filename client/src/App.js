import React, {useEffect} from 'react';
import Navbar from './Navbar';
import './App.css';
import Body from './Body';
import axios from 'axios';

export default function App() {

  return (
    <div className="App">
      <Navbar />
      <Body />
    </div>
  );
}
