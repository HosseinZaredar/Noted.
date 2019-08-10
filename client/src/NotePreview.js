import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import contentCrop from './util/contentCrop';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'block',
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    '&:hover': {
      boxShadow: "0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)"
    }
  },
  dialog: {
    padding: "4px"
  },
  button: {
    float: 'right',
  },
  icon: {
    color: '#616161',
    '&:hover': {
      color: '#212121',
    }
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
  },
  titleInput: {
    display: 'block',
    fontSize: 20,
    fontWeight: "bold",
    width: '500px'
  },
  contentInput: {
    display: 'block',
    fontSize: 14,
    margin: "5px",
    width: '100%'
  },
}));

export default function NotePreview({_id, title, content, deleteNote, saveNote}) {
  const classes = useStyles();

  var [isOpen, setIsOpen] = useState(false);
  var [changed, setChanged] = useState(false);
  var [titleInput, setTitleInput] = useState(title);
  var [contentInput, setContentInput] = useState(content);

  function handleOpen() {
    setIsOpen(true);
    setChanged(false);
  }

  function handleClose() {
    setIsOpen(false);
    if (changed) {
      saveNote(_id, {
        title: titleInput,
        content: contentInput
      });
    }    
  }

  function handleDelete() {
    deleteNote(_id);
  }


  function handleChange(e) {
    if (e.target.name == 'title') {
      setTitleInput(e.target.value);
    } else {
      setContentInput(e.target.value);
    }
    setChanged(true);
  }

  var dialogItems = <div>
        <InputBase
          placeholder="Title"
          name="title"
          className={classes.titleInput}
          value={titleInput}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'naked' }}
          margin="none"
        />
        <Divider variant="root" />
        <InputBase
          placeholder="Content"
          name="content"
          multiline
          rowsMax="20"
          inputProps={{ 'aria-label': 'naked' }}
          value={contentInput}
          onChange={handleChange}
          className={classes.contentInput}
          margin="none"
        />
        <br></br>
        <DeleteIcon className={classes.icon} onClick={handleDelete}/>
        <Button color="inherit" className={classes.button} onClick={handleClose}>Close</Button>
      </div>
  


  return (
    <div>
      <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialog}
      >
        <DialogContent>
          {dialogItems}
        </DialogContent>
      </Dialog>

      
      <Card className={classes.card} onClick={handleOpen}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Divider variant="root" />
          <Typography variant="h6" className={classes.content}>
            {contentCrop(content)}
          </Typography>
          </CardContent>
        </Card>
    </div>
  );
}
