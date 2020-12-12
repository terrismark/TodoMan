import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

export const returnErrors = (msg, status, name) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, name }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}