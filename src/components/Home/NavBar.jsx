import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AccountBox } from '@material-ui/icons'
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';

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
              <Typography variant="h5" className={classes.title}>
                  TodoMan
              </Typography>

              { false ? 
              <Typography variant="subtitle1" color="primary" className={classes.SignedInAs}>
                  Signed in as: User
              </Typography> :
              <>
                <Typography variant="subtitle1" color="primary">
                    Sign in
                </Typography>

                <IconButton size="large" color="primary">
                  <AccountBox fontSize="large"/>
                </IconButton>
              </>
              }
          </Toolbar>
        </AppBar>
      </div>
);
}
