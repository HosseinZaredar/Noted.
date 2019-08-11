import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/RestorePage';
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
  titleDialog: {
    display: 'block',
    fontSize: 20,
    fontWeight: "bold",
  },
  contentDialog: {
    display: 'block',
    fontSize: 14,
    margin: "5px",
  },
}));

export default function NotePreview({_id, title, content, restoreNote, deleteNote}) {
  const classes = useStyles();

  var [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);   
  }

  function handleRestore() {
    restoreNote(_id);
    setIsOpen(false);
  }

  function handleDelete() {
    deleteNote(_id);
    setIsOpen(false);
  }


  var dialogItems = <div>
        <Typography className={classes.titleDialog}>
          {title}
        </Typography>
        <Divider />
        <Typography className={classes.contentDialog}>
          {content}
        </Typography>
        <br></br>
        <RestoreIcon className={classes.icon} onClick={handleRestore}/>
        <DeleteIcon className={classes.icon} onClick={handleDelete}/>
        <Button color="inherit" className={classes.button} onClick={handleClose}>Close</Button>
      </div>
  

  return (
    <div>
      <Dialog
      maxWidth="sm"
      fullWidth={true}
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
          <Divider />
          <Typography variant="h6" className={classes.content}>
            {contentCrop(content)}
          </Typography>
          </CardContent>
        </Card>
    </div>
  );
}
