import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  content : {
    fontSize: 14,
    margin: "5px"
  },
  button: {
    float: 'right',
  },
  icon: {
    color: '#616161',
    '&:hover': {
      color: '#212121',
    }
  }
}));

export default function NotePreview({id, title, content, deleteNote}) {
  const classes = useStyles();

  var [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleDelete() {
    deleteNote(id);
  }

  return (
    <div>
      {isOpen && 
        <Dialog
        open={isOpen}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
        >
          <DialogContent>
            <Typography variant="h6" className={classes.title}>
            {title}
            </Typography>
            <Divider variant="root" />
            <Typography variant="h6" className={classes.content}>
              {content}
            </Typography>
            <br></br>
            <EditIcon className={classes.icon}/>
            <DeleteIcon className={classes.icon} onClick={handleDelete}/>
            <Button color="inherit" className={classes.button} onClick={handleClick}>Close</Button>
          </DialogContent>

          
        </Dialog>
      }
      <Card className={classes.card} onClick={handleClick}>
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
