import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Button,
    Container, 
    CssBaseline, 
    makeStyles, 
    ThemeProvider, 
    Typography 
} from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber
  }
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
    },
    footer: {
        marginTop: theme.spacing(8)
    },
    divItem: {
        marginTop: theme.spacing(4),
    }
}))

export default function PageNotFound() {
    const classes = useStyles()
    const history = useHistory()

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container maxWidth="xs">
                    <div container justify="center" className={classes.paper}>
                        <div item align="center">
                            <Typography align="center" color="primary" component="h1" variant="h2" className={classes.divItem}>
                                Error 404 
                            </Typography>
                        </div>

                        <div item align="center">
                            <Typography align="center" component="h1" variant="h5">
                                Page not found
                            </Typography>
                        </div>

                        <div item align="center" className={classes.divItem}>
                            <Button 
                                size="large"
                                color="primary" 
                                variant="outlined"
                                aria-label="Home"
                                onClick={() => history.push("/")}
                            >
                                return home
                            </Button>
                        </div>
      
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
