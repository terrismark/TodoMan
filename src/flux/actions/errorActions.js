import { SET_ERRORS, CLEAR_ERRORS } from './types'

export const returnErrors = (msg, status, name) => {
    return {
        type: SET_ERRORS,
        payload: { msg, status, name }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}