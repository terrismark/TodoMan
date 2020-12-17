import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  List, 
  ListItem, 
  ListItemText
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
})

export default function Todos({ todos, loading, listId, setErrorMessage }) {
  const classes = useStyles();

  return (
      <List className={classes.root}>

        { loading && 
          <ListItem>
              <Skeleton variant="rect" width={268} height={56} style={{borderRadius: 2}}/>
          </ListItem>
        }
        
        {todos.length > 0 && todos.map(value => {
          return (
              <TodoItem 
                listId={listId}
                key={value._id} 
                completed={value.done} 
                id={value._id} 
                value={value.name} 
                date={value.date} 
                todos={todos}
                setErrorMessage={setErrorMessage}
                loading={loading}
              />
          )
        })}

        {todos.length === 0 && !loading &&
          <ListItem>
            <ListItemText primary="No tasks yet. Create new!" className={classes.textItem}/>
          </ListItem> 
        } 
      
      </List>
  );
}
