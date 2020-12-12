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
import validator from 'validator'
import { amber } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux'
import { login, setLoadingUser } from '../../actions/authActions'
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
        marginTop: theme.spacing(4)
    },
    onAccountBtn: {
        cursor: "pointer",
    },
    container: {
        padding: theme.spacing(0, 4)
    }
}))

export default function LoginPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const [ errorMessage, setErrorMessage ] = useState(null)

    const history = useHistory()

    useEffect(() => {
        if (error.name === "LOGIN_FAIL") {
            setErrorMessage(error.msg.message)
        } else {
            setErrorMessage(null)
        }
    }, [error])

    const [ emailError, setEmailError ] = useState({ name: "", status: false })

    const [ emailToAdd, setEmail ] = useState("")
    const [ passwordToAdd, setPassword ] = useState("")

    function handleSubmitLogin(e) {
        e.preventDefault()

        if (!validator.isEmail(emailToAdd)) {
            setEmailError({ name: "Invalid email", status: true})
            return
        } 

        setEmailError({ name: "", status: false})

        const logData = {
            email: emailToAdd,
            password: passwordToAdd
        }

        dispatch(login(logData))
        dispatch(setLoadingUser())

        if (errorMessage) {
            alert(errorMessage)
            return
        }

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
                            Sign in
                        </Typography>

                        <form onSubmit={handleSubmitLogin} className={classes.form}>
                            <Grid container spacing={2}>
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
                                    autoFocus
                                />
                                </Grid>

                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    value={passwordToAdd}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                        disabled={ !emailToAdd || !passwordToAdd }
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>

                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <LinkButton variant="body2" color="primary" className={classes.onAccountBtn}>
                                    Don't have an account? Sign Up
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
