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
import { useDispatch } from 'react-redux'
import { deleteList } from '../../actions/listsActions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 20,
    backgroundColor: "#424242",
    borderRadius: 5,
  },
  textItem: {
    marginRight: 30,
  },
  link: {
    textDecoration: "none",
    color: "#fff"
  }
}))

export default function TodoListItem({ id, value, name, todosCount }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  return (
        <List key={id} className={classes.root} >
                <ListItem button onClick={() => history.push(`/${name}`)}>
                    <ListItemText 
                        primary={
                            <Typography style={{fontSize: "1.5rem"}}>
                                {value}
                            </Typography>
                        } 
                        className={classes.textItem} 
                    />

                    <ListItemSecondaryAction edge="end">
                        <IconButton onClick={() => dispatch(deleteList(id))}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

            <ListItem>
                <Typography variant="body2" component="p">
                    { todosCount > 0 ? 
                      `Number of tasks: ${todosCount}` : 
                      "No tasks yet. Create new!"}
                </Typography>
            </ListItem>

      </List>
  ) 
}
