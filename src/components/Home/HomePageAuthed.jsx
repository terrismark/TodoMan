import React from 'react';
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

import NavBar from './NavBar'
import Footer from './Footer'
import TodoLists from '../Todos/TodoLists'
import { amber } from '@material-ui/core/colors';
import { AddBox } from '@material-ui/icons';

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
        padding: theme.spacing(8, 0),
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
}))

export default function HomePage() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                    <NavBar />

                    <div container justify="center" className={classes.mainContainer}>
                        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom className={classes.MainText}>
                            Welcome back!
                        </Typography>

                        <Typography variant="h6" align="center" color="textSecondary" paragraph className={classes.pText}>
                            You can choose lists you have already created or create a new one
                        </Typography>
                    </div>

                    <Grid container justify="center" className={classes.main} alignContent="center" direction="column"> 
                        <Typography component="h4" variant="h4" align="center" color="primary" gutterBottom>
                            Your Todo lists
                        </Typography>

                        <TodoLists />
                        <Divider />

                        <Grid container alignContent="center" direction="column">
                            <Grid item className={classes.GridStyles} align="center">
                                <Typography variant="h6" color="textSecondary">
                                    Create a new Todo List
                                </Typography>
                            </Grid>

                            <Grid item align="center" alignContent="center" direction="row" className={classes.createNew}>
                                <List className={classes.listItem}>
                                    <ListItem dense>
                                        <ListItemText className={classes.listInput}>
                                            <TextField variant="outlined" label="New List"/>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Button size="large" color="primary">
                                                <AddBox fontSize="large"/>
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer />
                </Container>
        </ThemeProvider>
  );
}
