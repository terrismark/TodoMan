import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText,
} from '@material-ui/core';


import TodoItem from './TodoItem'

const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: 300,
    maxWidth: 440,
    backgroundColor: "#424242",
    borderRadius: 5,
  },
  textItem: {
    color: "#989898"
  }
})

export default function Todos({ todos }) {
  const classes = useStyles();

  return (
      <List className={classes.root}>
            
        { todos.length > 0 ? todos.map(value => {
            return (
              <TodoItem completed={value.done} id={value.id} value={value.name} todos={todos}/>
            )
        }) :
        <ListItem>
          <ListItemText primary="No tasks yet. Create new!" className={classes.textItem}/>
        </ListItem>
        }

      </List>
  );
}
