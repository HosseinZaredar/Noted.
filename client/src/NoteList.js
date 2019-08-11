import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NotePreview from './NotePreview';
import TrashNotePreview from './TrashNotePreview';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'none',
    padding: '20px',
  },
}));

export default function NoteList({isTrash, notes, restoreNote, deleteNote, saveNote}) {
  const classes = useStyles();

  function handleRestore(_id) {
    restoreNote(_id);
  }

  function handleDelete(_id) {
    deleteNote(_id);
  }

  function handleSave(_id, note) {
    saveNote(_id, note);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {notes.map(note => {
          return(
            <Grid item key={note._id} xs={12} sm={6} md={4} lg={3}>   
              {isTrash ? 
               <TrashNotePreview deleteNote={handleDelete} restoreNote={handleRestore} _id={note._id} title={note.title} content={note.content} />                
              :
               <NotePreview deleteNote={handleDelete} saveNote={handleSave} _id={note._id} title={note.title} content={note.content} />
              } 
            </Grid>
          );
        })}

      </Grid>
    </div>
  );
}
