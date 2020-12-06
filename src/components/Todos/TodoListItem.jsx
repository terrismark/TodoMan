import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 20,
    backgroundColor: "#424242",
    borderRadius: 5,
  },
}))

export default function TodoListItem({ key, value }) {
  const classes = useStyles();

  return (
        <List key={key} className={classes.root}>
            <ListItem>

            <ListItemText className={classes.textItem}>
                <Typography variant="h5" className={classes.textTodo}>
                    {value}
                </Typography>
            </ListItemText>  

            <ListItemSecondaryAction edge="end">
                <IconButton>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
               
            </ListItem>

            <ListItem>
                <Typography variant="body2" component="p">
                    No tasks yet. Create new!
                </Typography>
            </ListItem>

      </List>
  ) 
}
