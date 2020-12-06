import React from 'react';
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

export default function HomePage() {
    const classes = useStyles();

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
                            <Todos />
                        </Grid>

                        <Grid item className={classes.gridItem}>
                            <List className={classes.listItem}>
                                <ListItem dense>
                                    <ListItemText className={classes.listInput}>
                                        <TextField variant="outlined" label="New Todo"/>
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
                </Container>
        </ThemeProvider>
    );
}
