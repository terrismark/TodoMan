import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    CircularProgress,
    Container, 
    CssBaseline, 
    makeStyles, 
    ThemeProvider, 
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
        marginTop: theme.spacing(16)
    }
}))

export default function HomePage() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <div container justify="center" align="center" className={classes.paper}>
                    <CircularProgress color="primary" />
                </div>
            </Container>
                
        </ThemeProvider>
    );
}
