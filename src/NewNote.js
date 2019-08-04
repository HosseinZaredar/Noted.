import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  card: {
    margin: '15px',
    display: 'block',
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    '&:hover': {
      boxShadow: "0 4px 7px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22)"
    }
  },
  title : {
    display: 'block'
  },
  content : {
    display: 'block'
  },
  takeNote : {
    fontSize: 16
  }
}));

export default function NewNote(handleAdd) {
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
    handleAdd.handleAdd({
      title: title,
      content: content
    });
    setTitle('');
    setContent('');
  }

  var items;
  if (!isOpen) {
    items = 
      <Typography variant="h6" className={classes.takeNote}>
        Take a note...
      </Typography>
  } else {
    items = 
      <div>
        <TextField
          label="Title"
          name="title"
          className={classes.title}
          value={title}
          onChange={handleChange}
          margin="none"
        />
        <TextField
        id="standard-multiline-flexible"
        label="Content"
        name="content"
        multiline
        rowsMax="4"
        value={content}
        onChange={handleChange}
        className={classes.content}
        margin="normal"
        />
        <Button color="inherit" onClick={handleSubmit}>Done</Button>
      </div>
  }

  return (
    <div>
      <Grid container spacing={0} alignItems="center" justify="center">
        
        <Grid item xs={12} sm={10} lg={8} onClick={handleClick}>        
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
