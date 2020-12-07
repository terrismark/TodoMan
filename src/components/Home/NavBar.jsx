import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AccountBox } from '@material-ui/icons'
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
      margin: 0,
      padding: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "#fff"
  },
  SignedInAs: {
    paddingTop: 2
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <AppBar className={classes.navbar} elevation={0} color="default" position="sticky">
          <Toolbar>
              <Link to="/" className={classes.title}>
                <Typography variant="h5" className={classes.title}>
                    TodoMan
                </Typography>
              </Link>

              { false ? 
              <Typography variant="subtitle1" color="primary" className={classes.SignedInAs}>
                  Signed in as: User
              </Typography> :
              <>
                <Typography variant="subtitle1" color="primary">
                    Sign in
                </Typography>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <IconButton color="primary">
                    <AccountBox fontSize="large"/>
                  </IconButton>
                </Link>
              </>
              }
          </Toolbar>
        </AppBar>
      </div>
);
}
