import axios from 'axios'
import { clearErrors, returnErrors } from './errorActions'

import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGOUT_SUCCESS, 
    AUTH_ERROR, 
    USER_LOADED, 
    USER_LOADING,
} from './types'
import { API_URL } from '../api'

export const tokenConfig = (getState) => {
    const token = getState().auth.token

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['todoman-auth-token'] = token
    }

    return config
}

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    axios.get(API_URL + '/api/users', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(error => {
            dispatch(clearErrors())
            dispatch(returnErrors(error.response.data, error.response.status, "AUTH_ERROR"))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({ username, email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    const body = JSON.stringify({ username, email, password })

    axios.post(API_URL + '/api/users/register', body, config)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })})
        .catch(error => {
            dispatch(clearErrors())
            dispatch(returnErrors(error.response.data, error.response.status, "REGISTER_FAIL" ))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }

    const body = JSON.stringify({ email, password })

    axios.post(API_URL + '/api/users/login', body, config)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })})
        .catch(error => {
            dispatch(clearErrors())
            dispatch(returnErrors(error.response.data, error.response.status, "LOGIN_FAIL"))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return ({
        type: LOGOUT_SUCCESS
    })
}

export const setLoadingUser = () => {
    return ({
        type: USER_LOADING
    })
}