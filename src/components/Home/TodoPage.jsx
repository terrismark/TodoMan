import React, { useState } from 'react';
import { AddBox } from '@material-ui/icons'
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Button, 
    Container, 
    CssBaseline, 
    Grid, 
    List, 
    ListItem, 
    ListItemSecondaryAction, 
    ListItemText, 
    makeStyles, 
    TextField, 
    ThemeProvider, 
    Typography 
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../../actions/todosActions';

import NavBar from './NavBar'
import { amber } from '@material-ui/core/colors';
import Todos from '../Todos/Todos';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
  },
});

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(10)
    },
    mainContainer: {
        margin: theme.spacing(2)
    },
    gridItem1: {
        marginTop: theme.spacing(2)
    },
    gridItem2: {
        margin: theme.spacing(0, 2)
    },
    listInput: {
        minWidth: 60,
        maxWidth: 180,
        marginRight: 0
    }
}))

export default function TodoPage({ todos, listId, name }) {
    const auth = {
        name: "User 0"
    }

    const classes = useStyles();
    const dispatch = useDispatch()
    const loading = useSelector(state => state.lists.loadingTodos)

    const [ newItemToAdd, setNewItem ] = useState("") 

    function handleAddTodo(e) {
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
            dispatch(addTodo(newItemToAdd, listId))
        }
        setNewItem("")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container maxWidth="md"  className={classes.container}>
                    <NavBar auth={auth}/>
                    <div container justify="center" className={classes.mainContainer}>
                        <Typography component="h4" variant="h4" align="center" color="primary">
                            {name[0].toUpperCase() + name.slice(1)}
                        </Typography>
                    </div>
                    
                    <Grid container alignContent="center" direction="column">
                        <Grid item className={classes.gridItem2}>
                            <List className={classes.listItem}>
                                <form autoсomplete="off" onSubmit={handleAddTodo}>
                                    <ListItem dense>
                                        <ListItemText className={classes.listInput}> 
                                            <TextField 
                                                value={newItemToAdd} 
                                                name="text" 
                                                onChange={(e) => setNewItem(e.target.value)}
                                                variant="outlined" 
                                                label="New Todo"
                                            />
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Button type="submit" size="large" color="primary" disabled={newItemToAdd.length === 0}>
                                                <AddBox fontSize="large"/>
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </form>
                            </List>
                        </Grid>

                        <Grid item className={classes.gridItem1}>
                            <Todos todos={todos} listId={listId} loading={loading}/>
                        </Grid>
                    </Grid>
                </Container>
        </ThemeProvider>
    );
}
