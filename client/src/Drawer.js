import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerComponent from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/BookOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import CheckIcon from '@material-ui/icons/CheckBoxOutlined';
import {withRouter} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  title: {
    margin: '15px',
  },
  checkIcon: {
    position: 'relative',
    top: '5px'
  },
  list: {
    width: '200px'
  }
}));

function Drawer({history, isOpen, toggleDrawer}) {
  const classes = useStyles();

  return (
    <DrawerComponent open={isOpen} onClose={toggleDrawer}>
      <Typography variant="h6" className={classes.title}>
        <CheckIcon className={classes.checkIcon}/>Noted.
      </Typography>
      <Divider/>
      <List className={classes.list}>
        {history.location.pathname === "/" ?
        <ListItem selected button onClick={() => {history.push('/'); toggleDrawer();}}>
          <ListItemIcon><BookIcon/></ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItem>
        :
        <ListItem button onClick={() => {history.push('/'); toggleDrawer();}}>
          <ListItemIcon><BookIcon/></ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItem>
        }
        {history.location.pathname === "/trash" ?
        <ListItem selected button onClick={() => {history.push('/trash'); toggleDrawer();}}>
          <ListItemIcon><TrashIcon/></ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
        :
        <ListItem button onClick={() => {history.push('/trash'); toggleDrawer();}}>
          <ListItemIcon><TrashIcon/></ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
        }
      </List>
    </DrawerComponent>
  );
}


export default withRouter(Drawer);