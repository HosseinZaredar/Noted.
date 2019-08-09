import React, {useState} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles(theme => ({
  dialog: {
    overflow: 'hidden',
  },
  grid : {
    overflow: 'hidden'
  },
  textField: {
    width: '95%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    fontSize: '25px'
  }
}));

export default function SignUp({handleClose}) {
  const classes = useStyles();

  var [username, setUsername] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }
  

  function submit() {
    axios.post('/api/signup', {username, email, password})
    .then((res) => {
      console.log(res);
    });
  }

  return (
    
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialog}
      >
        <DialogContent>
          <Grid className={classes.grid}
          container 
          spacing={0}
          alignItems="center"
          justify="center"
          >
              <Grid item className={classes.title}>
                  Sign Up  
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  onChange={changeUsername}
                  value={username}
                  className={classes.textField}
                  name="username"
                  margin="normal"
                  autoComplete="username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  onChange={changeEmail}
                  value={email}
                  className={classes.textField}
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  className={classes.textField}
                  onChange={changePassword}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button color="inherit" className={classes.button} onClick={submit}>Sign Up</Button>    
              </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
  );
}
