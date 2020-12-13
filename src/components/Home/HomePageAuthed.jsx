import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Button, 
    Container, 
    CssBaseline, 
    Divider, 
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
import { addList } from '../../actions/listsActions';

import NavBar from './NavBar'
import Footer from './Footer'
import TodoLists from '../Todos/TodoLists'
import { amber } from '@material-ui/core/colors';
import { AddBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
  },
});

const useStyles = makeStyles((theme) => ({
    secondaryButton: {
      marginRight: 0
    },
    mainContainer: {
        backgroundColor: "#424242",
        padding: theme.spacing(6, 0, 4),
        borderRadius: 5,
    },
    pText: {
        padding: theme.spacing(0, 8)
    },
    buttons: {
        marginTop: theme.spacing(4)
    },
    main: {
        marginTop: theme.spacing(4)
    },
    GridStyles: {
        marginTop: theme.spacing(4)
    },
    MainText: {
        padding: theme.spacing(0, 4),
    },
    createNew: {
        marginTop: theme.spacing(2)
    },
    listInput: {
        width: 160,
        marginRight: 40
    },
    alert: {
        maxWidth: 340,
        marginTop: theme.spacing(4)
    }
}))

export default function HomePageAuthed({ lists, username }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.lists.loadingLists)

    const [ errorMessage, setErrorMessage ] = useState({ name: "", status: false})

    const [ newItemToAdd, setNewItem ] = useState("") 

    useEffect(() => {
        setErrorMessage({ name: "", status: false})
    }, [newItemToAdd])

    function handleAddList(e) {
        e.preventDefault()

        if (newItemToAdd.length > 16) {
            return setErrorMessage({ name: "Two long name. Try another variant!", status: true})
        }

        function checkIfItemIsIn(item, list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === item) {
                    return true
                }
            }
            return false
        }

        if (checkIfItemIsIn(newItemToAdd, lists)) {
            return setErrorMessage({ name: "You already have a list with the same name. Try another variant!", status: true})
        }

        if (newItemToAdd.length > 0) {
            dispatch(addList(newItemToAdd))
        }
        
        setNewItem("")
        setErrorMessage({ name: "", status: false})
        
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                    <NavBar/>

                    <div container justify="center" className={classes.mainContainer}>
                        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.MainText}>
                            Welcome back, {username}!
                        </Typography>

                        <Typography variant="body1" align="center" color="textSecondary" paragraph className={classes.pText}>
                            You can choose lists you have already created or create a new one
                        </Typography>
                    </div>

                    <Grid container justify="center" className={classes.main} alignContent="center" direction="column"> 
                        <Typography component="h4" variant="h4" align="center" color="primary" gutterBottom>
                            Your Todo lists
                        </Typography>

                        <TodoLists lists={lists} loading={loading}/>
                        <Divider />

                        <Grid item align="center">
                            { errorMessage.status && 
                                <Alert align="left" severity="warning" className={classes.alert}>
                                    <AlertTitle>Error</AlertTitle>
                                    <strong>{errorMessage.name}</strong>
                                </Alert>
                            }
                        </Grid>

                        <Grid container alignContent="center" direction="column">
                            <Grid item className={classes.GridStyles} align="center">
                                <Typography variant="h6" color="textSecondary">
                                    Create a new Todo List
                                </Typography>
                            </Grid>

                            <Grid item align="center" className={classes.createNew}>
                                <List className={classes.listItem}>
                                    <form autoсomplete="off" onSubmit={handleAddList}>
                                        <ListItem dense>
                                            <ListItemText className={classes.listInput}>
                                                <TextField 
                                                    variant="outlined"
                                                    value={newItemToAdd}
                                                    onChange={(e) => setNewItem(e.target.value)} 
                                                    label="New List"
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
                    </Grid>

                    <Footer />
                </Container>
        </ThemeProvider>
  );
}
