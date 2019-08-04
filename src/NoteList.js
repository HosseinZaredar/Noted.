import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NotePreview from './NotePreview';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'none',
    padding: '20px',
  },
}));

export default function NoteList({notes, deleteNote}) {
  const classes = useStyles();

  function handleDelete(id) {
    deleteNote(id);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {notes.map(note => {
          return(
            <Grid item xs={12} sm={6} md={4} lg={3}>        
              <NotePreview deleteNote={handleDelete} id={note.id} title={note.title} content={note.content} />
            </Grid>
          );
        })}

      </Grid>
    </div>
  );
}
