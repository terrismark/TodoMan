import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, Close, Done } from '@material-ui/icons'
import { 
  ListItemIcon, 
  ListItemSecondaryAction, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  ListItem,
  Typography,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { completeTodo, deleteTodo, updateTodo } from '../../actions/todosActions';


const useStyles = makeStyles({
    secondaryButton: {
      marginRight: 0,
    },
    textItem: {
        maxWidth: 160,
        marginRight: 80
    },
    editTextItem: {
        maxWidth: 160,
        marginRight: 40,
        marginLeft: 10
    },
    completedItem: {
        textDecoration: "line-through"
    },
    cancelEdit: {
        marginLeft: -13
    }
})

export default function TodoItem({ id, value, completed, todos }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [ editMode, setEditMode ] = useState(false)

    const [ newItemToAdd, setNewItem ] = useState(value) 

    function handleEditItem(e) {
        e.preventDefault()

        function checkIfItemIsIn(item, list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === item) {
                    return true
                }
            }
            return false
        }

        if (checkIfItemIsIn(newItemToAdd, todos)) {
            alert("You already have the same task. Try another variant!")
            return
        }

        if (newItemToAdd.length > 0) {
            dispatch(updateTodo(newItemToAdd, id))
        }

        setNewItem("")
        setEditMode(false)
    }

    return (
        <>
            { !editMode ?
            <ListItem key={id}>
               
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        color="primary"
                        checked={completed}
                        onChange={() => dispatch(completeTodo(id))}
                        disableRipple
                    />
                </ListItemIcon>

                <ListItemText className={classes.textItem}>
                    { completed ?                 
                        <Typography className={classes.completedItem}>
                            {value}
                        </Typography> :
                        <Typography>
                            {value}
                        </Typography>
                    }
                </ListItemText>

                <ListItemSecondaryAction>
                    {!completed && 
                    <IconButton onClick={() => setEditMode(!editMode)} edge="end" className={classes.secondaryButton}>
                        <Edit />
                    </IconButton>}
                    
                    <IconButton onClick={() => dispatch(deleteTodo(id))} edge="end" color="primary">
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem> :
            <ListItem key={id}>

            <ListItemIcon className={classes.cancelEdit}>
                <IconButton onClick={() => setEditMode(!editMode)}>
                    <Close
                        edge="start"
                        color="default"
                    />
                </IconButton>
            </ListItemIcon> 

            <form onSubmit={handleEditItem}>
                <ListItemText className={classes.editTextItem}>
                    <TextField
                        defaultValue={value}
                        value={newItemToAdd}
                        onChange={(e) => setNewItem(e.target.value)}
                        type="text"
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton type="submit" edge="end" color="primary" disabled={newItemToAdd.length === 0 || newItemToAdd === value}>
                        <Done />
                    </IconButton>
                </ListItemSecondaryAction>
            </form>
        </ListItem> }
    </>
    )
}