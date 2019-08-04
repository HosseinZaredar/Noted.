import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles(theme => ({
  card: {
    margin: '15px',
    display: 'block',
  },
  title: {
    display: 'block',
  },
  content: {
    display: 'block',
  },
  takeNote: {
    fontSize: 16
  },
  button: {
    float: 'right',
    marginBottom: '5px'
  }
}));

export default function NewNote({handleAdd}) {
  const classes = useStyles();

  var [isOpen, setIsOpen] = useState(false);
  var [title, setTitle] = useState('');
  var [content, setContent] = useState('');

  function handleClick() {
    if (!isOpen)
      setIsOpen(true);
  }

  function handleChange(e) {
    if (e.target.name == 'title') {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  }

  function handleSubmit() {
    setIsOpen(false);
    handleAdd({
      id: Date.now(),
      title: title,
      content: content
    });
    setTitle('');
    setContent('');
  }

  function handleDiscard() {
    setIsOpen(false);
    setTitle('');
    setContent('');
  }

  var items;
  if (!isOpen) {
    items = 
      <InputBase
        placeholder="Take a note..."
        inputProps={{ 'aria-label': 'naked' }}
        margin="none"
      />
  } else {
    items = 
      <div>
        <InputBase
          placeholder="Title"
          name="title"
          className={classes.title}
          value={title}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'naked' }}
          margin="none"
        />
        <InputBase
          placeholder="Content"
          name="content"
          multiline
          rowsMax="8"
          inputProps={{ 'aria-label': 'naked' }}
          value={content}
          onChange={handleChange}
          className={classes.content}
          margin="none"
        />
        <Button color="inherit" className={classes.button} onClick={handleSubmit}>Done</Button>
        <Button color="inherit" className={classes.button} onClick={handleDiscard}>Discard</Button>
      </div>
  }

  return (
    <div>
      <Grid container spacing={0} alignItems="center" justify="center">
        
        <Grid item xs={12} sm={10} md={8} onClick={handleClick}>        
          <Card className={classes.card} xs={6}>
            <CardContent>
              {items}
            </CardContent>
          </Card>
        </Grid>
        
      </Grid> 
    </div>
  );
}
