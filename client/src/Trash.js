import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import NoteList from './NoteList';

const useStyles = makeStyles(theme => ({
  root : {
    backgroundColor: "#f5f5f5",
    position: 'fixed',
    height: '100%',
    overflow:'scroll',
    width: '100%'
  }
}));

export default function Trash() {
  const classes = useStyles();

  var [notes, setNotes] = useState([]);

  function fetchNotes() {
    var token = localStorage.getItem('jwt');
    axios.get('/api/trash', {headers: {'Authorization': token}})
    .then((res) => {
      setNotes(res.data.notes);
    }); 
  }

  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
    }
  });

  function restoreNote(_id) {
    var token = localStorage.getItem('jwt');
    axios.put('/api/trash/' + _id, {}, {headers: {'Authorization': token}})
    .then((res) => {
        var newNotes = notes.filter(function (note, index, arr) {
          return note._id != _id;
        });
        setNotes(newNotes);
    });
  }

  function deleteNoteForever(_id) {
    var token = localStorage.getItem('jwt');
    axios.delete('/api/trash/' + _id, {headers: {'Authorization': token}})
    .then((res) => {
      var newNotes = notes.filter(function (note, index, arr) {
      return note._id != _id;
      });
      setNotes(newNotes);
    });
  }


  return (
    <div className={classes.root}>
      <NoteList isTrash={true} restoreNote={restoreNote} deleteNote={deleteNoteForever} notes={notes} />
    </div>
  );
}
