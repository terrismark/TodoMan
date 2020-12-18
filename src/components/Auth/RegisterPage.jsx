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
import { Alert, AlertTitle } from '@material-ui/lab';
import { amber } from '@material-ui/core/colors';

import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../flux/actions/authActions'
import { useHistory } from 'react-router-dom';

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
    },
    alert: {
        width: '100%',
        marginTop: theme.spacing(4)
    }
}))

export default function RegisterPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const [ errorMessage, setErrorMessage ] = useState({ name: "", status: false})

    const authed = useSelector(state => state.auth.isAuthed)

    const history = useHistory()

    useEffect(() => {
        if (authed) {
            setEmail("")
            setPassword("")
            history.push("/")

        } else if (error.name === "REGISTER_FAIL") {
            setErrorMessage({ name: error.msg.message, status: true })
        }

    }, [error, authed, history])

    const [ usernameError, setUsernameError ] = useState({ name: "", status: false })
    const [ emailError, setEmailError ] = useState({ name: "", status: false })
    const [ passwordError, setPasswordError ] = useState({ name: "", status: false })

    const [ usernameToAdd, setUsername ] = useState("")
    const [ emailToAdd, setEmail ] = useState("")
    const [ passwordToAdd, setPassword ] = useState("")
    const [ passwordToMatch, setPasswordToMatch ] = useState("")

    useEffect(() => {
        setErrorMessage({ name: "", status: false})
    }, [passwordToMatch])

    useEffect(() => {
        if (!usernameToAdd && !emailToAdd && !passwordToAdd) {
            setErrorMessage({ name: "", status: false})
        }

    }, [usernameToAdd, emailToAdd, passwordToAdd])

    function handleSubmitRegistration(event) {
        event.preventDefault()

        const regData = {
            username: usernameToAdd,
            email: emailToAdd,
            password: passwordToAdd
        }

        //  clearing prev errors
        setUsernameError({ name: "", status: false })
        setEmailError({ name: "", status: false })
        setPasswordError({ name: "", status: false }) 

        if (regData.username.length > 12) {
            setErrorMessage({ name: "", status: false })
            return setUsernameError({ name: "Too long username", status: true })
        } 

        if (!validator.isEmail(regData.email)) {
            setErrorMessage({ name: "", status: false })
            return setEmailError({ name: "Invalid email", status: true })
        } 

        if (regData.password.length < 6) {
            setErrorMessage({ name: "", status: false })
            return setPasswordError({ name: "Password too short", status: true })
        }

        if (regData.password !== passwordToMatch) {
            return setErrorMessage({ name: "Passwords don't match", status: true })
        }

        dispatch(register(regData))
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <Container className={classes.container} maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        { errorMessage.status && 
                            <Alert severity="error" className={classes.alert}>
                                <AlertTitle>Error</AlertTitle>
                                <strong>{errorMessage.name}</strong>
                            </Alert>
                        }

                        <form name="register-form" onSubmit={handleSubmitRegistration} className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                    error={usernameError.status}
                                    name="username"
                                    variant="outlined"
                                    helperText={usernameError.name || "Max length: 12 characters"}
                                    required
                                    fullWidth
                                    value={usernameToAdd}
                                    onChange={(e) => setUsername(e.target.value)}
                                    label="U s e r n a m e"
                                    autoComplete="off"
                                    autoFocus
                                />
                                </Grid>
                        
                                <Grid item xs={12}>
                                <TextField
                                    error={emailError.status}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    helperText={emailError.name || "We'll never share your email with anyone else."}
                                    value={emailToAdd}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="E m a i l"
                                    autoComplete="off"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                <TextField
                                    error={passwordError.status}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    helperText={passwordError.name || "Min length: 6 characters"}
                                    value={passwordToAdd}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="P a s s w o r d"
                                    type="password"
                                    autoComplete="off"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    helperText="Confirm your password"
                                    value={passwordToMatch}
                                    onChange={(e) => setPasswordToMatch(e.target.value)}
                                    label="C o n f i r m"
                                    type="password"
                                    autoComplete="off"
                                />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        size="large"
                                        type="submit"
                                        aria-label="Sign Up"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={ !usernameToAdd || !emailToAdd || !passwordToAdd || !passwordToMatch}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>

                            <LinkButton 
                                href="/login" 
                                aria-label="Sign In Link"
                                variant="body2" 
                                color="primary" 
                                className={classes.noAccountBtn}>
                                Already have an account? Sign In
                            </LinkButton>
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
