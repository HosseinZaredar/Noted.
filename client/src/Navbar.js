import React, {useState, useContext, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import {Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logout from '@material-ui/icons/ExitToApp'
import {UserContext} from './contexts/UserContext';
import axios from 'axios';

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
  icon: {
    '&:hover': {
      color: '#212121',
    }
  },
  username: {
    marginRight: '5px'
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const {username, setUsername} = useContext(UserContext);

  var [logout, setLogout] = useState(false);
  function handleLogout() {
    localStorage.removeItem('jwt');
    setLogout(true);
  }

  function fetchUsername() {
    if (username === '') {
      var token = localStorage.getItem('jwt');
      axios.get('/api/username', {headers: {'Authorization': token}})
       .then((res) => {
        console.log('Hell: ' + res.data.username);
        setUsername(res.data.username);
      });
    }
  } 

  useEffect(() => fetchUsername());

  if (logout) {
    return(<Redirect to="/login" />);
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
          <Typography className={classes.username}>
            {username}
          </Typography>
          <Logout className={classes.icon} onClick={handleLogout}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
