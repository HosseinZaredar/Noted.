import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import NoteList from './NoteList';
import NewNote from './NewNote';

const useStyles = makeStyles(theme => ({
  root : {
    backgroundColor: "#f5f5f5",
    position: 'fixed',
    height: '100%',
    overflow:'scroll',
    width: '100%'
  }
}));

export default function Body() {
  const classes = useStyles();

  var [notes, setNotes] = useState([]);
  
  function handleAdd(note) {
    var token = localStorage.getItem('jwt');
    axios.post('/api/note', {title: note.title, content: note.content},
    {headers: {'Authorization': token}})
    .then((res) => {
      var noteWithId = {...note, _id: res.data.id}
      setNotes([...notes, noteWithId]);
    }); 
  }

  function fetchNotes() {
    var token = localStorage.getItem('jwt');
    axios.get('/api/note', {headers: {'Authorization': token}})
    .then((res) => {
      setNotes(res.data.notes);
    }); 
  }

  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
    }
  });

  function deleteNote(_id) {
    var token = localStorage.getItem('jwt');
    axios.delete('/api/note/' + _id,  {headers: {'Authorization': token}})
    .then((res) => {
      var newNotes = notes.filter(function (note, index, arr) {
      return note._id != _id;
    })
    setNotes(newNotes);
    });
  }

  function saveNote(_id, note) {
    var token = localStorage.getItem('jwt');
    axios.put('/api/note/' + _id, {note}, {headers: {'Authorization': token}})
    .then((res) => {
      var index = notes.findIndex(note => note._id === _id);
      notes[index] = {_id: _id, ...note};
      setNotes([...notes]); 
    }); 
  }

  return (
    <div className={classes.root}>
      <NewNote handleAdd={handleAdd} />
      <NoteList deleteNote={deleteNote} saveNote={saveNote} notes={notes} />
    </div>
  );
}
