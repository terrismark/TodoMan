import React from 'react';
import { 
    Grid, makeStyles, Typography, 
} from '@material-ui/core';
import TodoListItem from './TodoListItem'

const useStyles = makeStyles(theme => ({
  typoNoLists: {
      margin: theme.spacing(4),
      color: "#989898"
  }
}))

export default function TodoLists({ lists }) {
  const classes = useStyles();

  return (
    <Grid 
        container
        justify="center"
        alignItems="center"
    >
        { lists.length > 0 ? lists.map(value => {
            return (
                <TodoListItem key={value.id} id={value.id} value={value.name}/>  
            )
        }) :
        <Typography variant="h6" color="textSecondary" className={classes.typoNoLists}>
          No lists yet. Create new!
        </Typography>}
        
    </Grid>
  );
}
