import React, { useState, useEffect } from 'react';
import { 
    Grid, 
} from '@material-ui/core';
import TodoListItem from './TodoListItem'

export default function TodoLists() {
  const [ todoLists, setTodoLists ] = useState([])

  useEffect(() => {
    setTodoLists(['List 1', 'List 2', 'List 3'])
  }, [])

  return (
    <Grid 
        container
        justify="center"
        alignItems="center"
    >
        {todoLists.map((value, index) => {
            return (
                <TodoListItem key={index} value={value}/>  
            )
        })}
    </Grid>
  );
}
