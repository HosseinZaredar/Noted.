import React from 'react';
import Navbar from './Navbar';
import NoteList from './NoteList';
import './App.css';


export default function App() {

  var title = 'Title';
  
  return (
    <div className="App">
      <Navbar />
      <NoteList />
    </div>
  );
}
