import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText,
} from '@material-ui/core';
import TodoItem from './TodoItem'

const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: 220,
    maxWidth: 440,
    backgroundColor: "#424242",
    borderRadius: 5,
  },
  textItem: {
    color: "#989898"
  }
})

export default function Todos() {
  const classes = useStyles();
  const [ todos, setTodos ] = useState([])

  useEffect(() => {
    setTodos(['item 1', 'item 2', 'item 3'])
  }, [])

  return (
      <List className={classes.root}>
            
        {todos.map((value, index) => {
            return (
              <TodoItem key={index} value={value}/>
            )
        })}

        <ListItem>
          <ListItemText primary="No tasks yet. Create new!" className={classes.textItem}/>
        </ListItem>

      </List>
  );
}
