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
    gridItem: {
        marginTop: theme.spacing(2)
    },
    listInput: {
        width: 120,
        marginRight: 60
    },
    title: {
        margin: theme.spacing(0, 2, 2)
    }
}))

export default function TodoPage() {
    const classes = useStyles();

    const todos = useSelector(state => state.todos)

    const dispatch = useDispatch()
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
            dispatch(addTodo(newItemToAdd))
        }
        setNewItem("")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container maxWidth="md"  className={classes.container}>
                    <NavBar />
                    <div container justify="center" className={classes.mainContainer}>
                        <Typography component="h4" variant="h4" align="center" color="textPrimary">
                            List 1
                        </Typography>
                    </div>
                    
                    <Grid container alignContent="center" direction="column">
                        <Grid item className={classes.gridItem}>
                            <Typography variant="h6" className={classes.title}>
                                Todos
                            </Typography>
                            <Todos todos={todos}/>
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <List className={classes.listItem}>
                                <form onSubmit={handleAddTodo}>
                                    <ListItem dense>
                                        <ListItemText className={classes.listInput}> 
                                            <TextField 
                                                value={newItemToAdd} 
                                                name="text" 
                                                onChange={(e) => setNewItem(e.target.value)}
                                                variant="outlined" 
                                                label="New Todo"
                                                autoComplete="false"
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
                    </Grid>
                </Container>
        </ThemeProvider>
    );
}
