import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import SignUp from './SignUp';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar : {
  },
}));

export default function Navbar() {
  const classes = useStyles();

  var [isSignUp, setIsSignUp] = useState(false);

  function toggleSignUp() {
    setIsSignUp(!isSignUp);
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Noted.
          </Typography>
          <Button color="inherit" onClick={toggleSignUp}>Sign Up</Button>
          <Button color="inherit">Login</Button>

          {isSignUp && 
            <SignUp handleClose={toggleSignUp}/>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}
