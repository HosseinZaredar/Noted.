import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NotePreview from './NotePreview';

import NotesDB from './NotesDB';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#f5f5f5",
    position: 'fixed',
    height: '100%',
    overflow:' hidden',
    padding: '20px',
  },
}));

export default function NoteList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        {NotesDB.map(note => {
          return(
            <Grid item xs={12} sm={6} md={4} lg={3}>        
              <NotePreview title={note.title} content={note.content} />
            </Grid>
          );
        })}

      </Grid>
    </div>
  );
}
