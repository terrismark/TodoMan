import React, { useState, useEffect } from 'react';
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
import { amber } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../../flux/actions/todosActions';

import NavBar from './NavBar'
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
        maxWidth: 160,
        marginRight: 0
    },
    secondatyBtn: {
        right: 0
    },
    alert: {
        maxWidth: 340,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}))

export default function TodoPage({ todos, listId, name }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.lists.loadingTodos)

    const [ errorMessage, setErrorMessage ] = useState({ name: "", status: false})

    const [ newItemToAdd, setNewItem ] = useState("") 

    useEffect(() => {
        setErrorMessage({ name: "", status: false})
    }, [newItemToAdd])

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
            return setErrorMessage({ name: "You already have the same task. Try another variant!", status: true})
        }

        if (newItemToAdd.length > 0) {
            dispatch(addTodo(newItemToAdd, listId))
        }

        setNewItem("")
        setErrorMessage({ name: "", status: false})
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container maxWidth="md"  className={classes.container}>
                    <NavBar />
                    <div container justify="center" className={classes.mainContainer}>
                        <Typography component="h4" variant="h4" align="center" color="primary">
                            {name[0].toUpperCase() + name.slice(1)}
                        </Typography>
                    </div>

                    <div container align="center" justify="center">
                        { errorMessage.status && 
                            <Alert align="left" severity="warning" className={classes.alert}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{errorMessage.name}</strong>
                            </Alert>
                        }
                    </div>
                    
                    <Grid container alignContent="center" ustify="center" direction="column">
                        <Grid item align="center" className={classes.gridItem2}>
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

                        <Grid item align="center" className={classes.gridItem1}>
                            <Todos 
                                todos={todos} 
                                listId={listId} 
                                loading={loading} 
                                setErrorMessage={setErrorMessage} 
                            />
                        </Grid>
                    </Grid>
                </Container>
        </ThemeProvider>
    );
}
