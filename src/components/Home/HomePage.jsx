import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Button, 
    Container, 
    CssBaseline, 
    Grid, 
    List, 
    ListItem, 
    ListItemText, 
    makeStyles, 
    ThemeProvider, 
    Typography, 
    ListItemIcon,
} from '@material-ui/core';
import { Battery20, Visibility, CenterFocusStrong, Flare  } from '@material-ui/icons'


import NavBar from './NavBar'
import Footer from './Footer'
import { amber } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

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
        padding: theme.spacing(0, 2)
    },
    buttons: {
        marginTop: theme.spacing(4)
    },
    main: {
        marginTop: theme.spacing(8)
    },
    Cards: {
        maxWidth: 520,
    },
    gridItemHeader: {
        margin: theme.spacing(0, 2)
    },
    list: {
        maxWidth: 460,
    }
}))

export default function HomePage() {
    const classes = useStyles();

    const advantages = [
        {name: "Dark theme saves battery life.", icon: <Battery20 />},
        {name: "Reduces eye strain in a low light environment.", icon: <Visibility />},
        {name: "The Dark theme puts a focus on your content. You can strategically utilize the bright colours for your main content to stand out.", icon: <CenterFocusStrong />},
        {name: "The blue light emitted is minimized due to the reduction in screen glare.", icon: <Flare />},
    ]

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <NavBar />

                <div container justify="center" className={classes.mainContainer}>
                    <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                        TodoMan
                    </Typography>

                    <Typography variant="h6" align="center" color="textSecondary" paragraph className={classes.pText}>
                        A simple Todo App for everyday use
                    </Typography>

                    <Grid container spacing={2} justify="center" className={classes.buttons}>
                        <Grid item className={classes.gridItemHeader}>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" size="large" color="primary">
                                    Create an account
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item className={classes.gridItemHeader}>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" size="large" color="primary">
                                    Sign in
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>

                <Grid container justify="center" className={classes.main} alignContent="center" direction="column"> 
                    <Typography component="h4" variant="h4" align="center" color="primary" gutterBottom>
                        Why Dark Mode?
                    </Typography>

                    <Typography variant="h6" align="center" color="textSecondary" paragraph className={classes.pText}>
                        Positives about the dark themed user interfaces.
                    </Typography> 

                    <Grid item align="center">
                        <List className={classes.list}>
                            {advantages.map((value, index) => {
                                return (
                                    <ListItem item key={index}>
                                        <ListItemIcon color="primary">
                                            {value.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={value.name}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid> 
                </Grid>

                <Footer />
            </Container>
                
        </ThemeProvider>
    );
}
