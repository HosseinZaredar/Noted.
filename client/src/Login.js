import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
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
  },
  button: {
    marginBottom: '5px'
  }
}));

export default function Login() {
  const classes = useStyles();

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [redirect, setRedirect] = useState(false);

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }
  

  function submit() {
    axios.post('/api/login', {email, password})
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem('jwt', res.data.token);
        setRedirect(true);
      }
    });
  }

  if (redirect) {
    return(<Redirect to="/" />)
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
                Login  
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
                  autoFocus
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
                <Button color="primary" variant="outlined" className={classes.button} onClick={submit}>Login</Button>    
              </Grid>
              <Grid item xs={12}>
                <Divider />  
              </Grid>
              <Grid item>
                Don't have an account?   
                <Link to="/signup">Sign up</Link>
              </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
  );
}
