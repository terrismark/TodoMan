import React from 'react';
import { 
    Grid, List, ListItem, makeStyles, Typography, 
} from '@material-ui/core';
import TodoListItem from './TodoListItem'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  typoNoLists: {
      margin: theme.spacing(4),
      color: "#989898"
  },
  loader: {
    maxWidth: 345,
    margin: 20,
    backgroundColor: "#424242",
    borderRadius: 5
  }
}))

export default function TodoLists({ lists, loading }) {
  const classes = useStyles();

  return (
    <Grid 
        container
        justify="center"
        alignItems="center"
    >
        { !loading ?
        lists.length > 0 ? 
          lists.map(value => {
            return (
                <TodoListItem key={value._id} id={value._id} value={value.name} name={value.name} todosCount={value.todos.length} />  
            )
        }) :
        <Typography variant="h6" color="textSecondary" className={classes.typoNoLists}>
          No lists yet. Create new!
        </Typography> :
        [...Array(lists.length || 1).keys()].map((value) => {
            return (
              <List key={value} className={classes.loader} >
                <ListItem>
                  <Skeleton variant="rect" width={200} height={48} style={{borderRadius: 2}}/>
                </ListItem>

                <ListItem>
                  <Skeleton variant="rect" width={160} height={18} style={{borderRadius: 2}}/>
                </ListItem>

              </List>
            )}
        )}
        
    </Grid>
  );
}
