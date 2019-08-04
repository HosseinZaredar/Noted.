import React, {useState} from 'react';

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
    setNotes([...notes, note]);
  }

  return (
    <div className={classes.root}>
      <NewNote handleAdd={handleAdd} />
      <NoteList notes={notes} />
    </div>
  );
}
