import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { 
    Button, 
    Container, 
    CssBaseline, 
    Grid, 
    Link as LinkButton, 
    makeStyles, 
    TextField, 
    ThemeProvider, 
    Typography 
} from '@material-ui/core';
import { amber } from '@material-ui/core/colors';

import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { register, setLoadingUser } from '../../actions/authActions'
import { Link, useHistory } from 'react-router-dom';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
  },
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
    footer: {
        marginTop: theme.spacing(2)
    },
    noAccountBtn: {
        cursor: "pointer",
    },
    container: {
        padding: theme.spacing(0, 4)
    }
}))

export default function RegisterPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const error = useSelector(state => state.error.msg)

    const history = useHistory()

    const [ errorMessage, setErrorMessage ] = useState(null)

    useEffect(() => {
        if (error.name === "REGISTER_FAIL") {
            setErrorMessage(error.message)
        } else {
            setErrorMessage(null)
        }
    }, [error])

    const [ usernameError, setUsernameError ] = useState({ name: "", status: false })
    const [ emailError, setEmailError ] = useState({ name: "", status: false })
    const [ passwordError, setPasswordError ] = useState({ name: "", status: false })

    const [ usernameToAdd, setUsername ] = useState("")
    const [ emailToAdd, setEmail ] = useState("")
    const [ passwordToAdd, setPassword ] = useState("")

    function handleSubmitRegistration(e) {
        e.preventDefault()

        if (usernameToAdd.length > 12) {
            setUsernameError({ name: "Too long username", status: true})
        } else {
            setUsernameError({ name: "", status: false})
        }

        if (!validator.isEmail(emailToAdd)) {
            setEmailError({ name: "Invalid email", status: true})
        } else {
            setEmailError({ name: "", status: false})
        }

        if (!validator.isLength(passwordToAdd, {min: 6})) {
            setPasswordError({ name: "Password too short", status: true})
        } else {
            setPasswordError({ name: "", status: false})
        }

        if (emailError.status || passwordError.status || usernameError.status) {
            return
        }

        const regData = {
            username: usernameToAdd,
            email: emailToAdd,
            password: passwordToAdd
        }

        dispatch(register(regData))
        dispatch(setLoadingUser())

        if (errorMessage) {
            alert(errorMessage)
            return
        } 
    
        setUsername("")
        setEmail("")
        setPassword("")

        history.push("/")
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container className={classes.container} maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <form onSubmit={handleSubmitRegistration} className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                    error={usernameError.status}
                                    name="username"
                                    variant="outlined"
                                    helperText={usernameError.name || "max length: 12 characters"}
                                    required
                                    fullWidth
                                    id="username"
                                    value={usernameToAdd}
                                    onChange={(e) => setUsername(e.target.value)}
                                    label="Username"
                                    autoFocus
                                />
                                </Grid>
                        
                                <Grid item xs={12}>
                                <TextField
                                    error={emailError.status}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    helperText={emailError.name}
                                    value={emailToAdd}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                <TextField
                                    error={passwordError.status}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    helperText={passwordError.name || "min length: 6 characters"}
                                    value={passwordToAdd}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        size="large"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={ !usernameToAdd || !emailToAdd || !passwordToAdd}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>

                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <LinkButton variant="body2" color="primary" className={classes.noAccountBtn}>
                                    Already have an account? Sign In
                                </LinkButton>
                            </Link>
                        </form>
      
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
