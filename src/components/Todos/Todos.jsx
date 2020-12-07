import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  List, ListItem, ListItemText, Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton'


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
  },
  loader: {
    
  }
})

export default function Todos({ todos, loading }) {
  const classes = useStyles();

  return (
      <List className={classes.root}>
        
        { !loading ? 
        todos.length > 0 ? todos.map(value => {
            return (
                <TodoItem 
                  key={value.id} 
                  completed={value.done} 
                  id={value._id} 
                  value={value.name} 
                  date={value.date} 
                  todos={todos}/>
            )
        }) :
        <ListItem>
          <ListItemText primary="No tasks yet. Create new!" className={classes.textItem}/>
        </ListItem> :
        <>
        {[...Array(todos.length || 1).keys()].map((value) => {
          return (
              <ListItem key={value} className={classes.loader}>
                  <Skeleton variant="rect" width={268} height={56} />
              </ListItem>
          )
        })}
        </>
        }
      
      </List>
  );
}
