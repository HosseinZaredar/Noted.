import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  card: {
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

  return (
    <div>
      <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Divider variant="root" />
        <Typography variant="h6" className={classes.content}>
          {content}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
