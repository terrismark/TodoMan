import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Container, 
    CssBaseline, 
    makeStyles, 
    ThemeProvider, 
    Typography 
} from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
  },
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    footer: {
        marginTop: theme.spacing(10)
    },
    noAccountBtn: {
        cursor: "pointer",
    },
    linkHome: {
        color: "#fff"
    },
    button: {
        marginTop: theme.spacing(4),
    }
}))

export default function PageNotFound() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container maxWidth="xs">
                    <div container justify="center" className={classes.paper}>
                        <Typography align="center" component="h1" variant="h2">
                        Error 404 
                        </Typography>

                        <Typography align="center" color="primary" component="h1" variant="h5">
                        Page not found
                        </Typography>
      
                        <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
                            {'Copyright © Mark Terris '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </div>
                </Container>
        </ThemeProvider>
    );
}
