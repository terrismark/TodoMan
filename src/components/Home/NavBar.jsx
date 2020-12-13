import React, { useState, useEffect, createRef } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { AccountBox } from '@material-ui/icons'
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Popover,
    Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout, setLoadingUser } from '../../actions/authActions'

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
  },
  popOver: {
    padding: theme.spacing(2)
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [ anchorPopOver, setAnchorPopOver ] = useState(null)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [ isAuthed, setAuthed ] = useState(false)
  const [ username, setUsername ] = useState(null)

  const iconRef = createRef()

  useEffect(() => {
    if (auth.isAuthed) {
      setAuthed(true)
      setUsername(auth.user.username)
    }
  }, [dispatch, auth])

  function handleLogOut() {
    dispatch(setLoadingUser())
    dispatch(logout())
    
    window.location.reload()
  }

  return (
      <div className={classes.root}>
        <AppBar className={classes.navbar} elevation={0} color="default" position="sticky">
          <Toolbar>
              
                <Typography variant="h5" className={classes.title}>
                    <Link to="/" className={classes.title}>
                      TodoMan
                    </Link>
                </Typography>
              

              { isAuthed ? 
              <>
                <Typography variant="subtitle1" color="primary" className={classes.SignedInAs}>
                    {username}
                </Typography>

                <IconButton color="primary" ref={iconRef} onClick={() => setAnchorPopOver(iconRef.current)}>
                    <AccountBox fontSize="large"/>
                </IconButton>

                <Popover
                  open={Boolean(anchorPopOver)}
                  anchorEl={anchorPopOver}
                  onClose={() => setAnchorPopOver(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Link to="/" className={classes.title}>
                    <Button className={classes.typography} size="large" onClick={handleLogOut}>Logout</Button>
                  </Link>
                </Popover>
              </> :
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
