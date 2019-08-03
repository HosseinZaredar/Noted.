import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
}));

export default function NotePreview({title, content}) {
  const classes = useStyles();

  var [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
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
