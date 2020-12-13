import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const error = {
    msg: {},
    status: null,
    name: null
}

export default function errorsReducer(state = error, action) {
    switch (action.type) {

        case SET_ERRORS:
            return ({
                msg: action.payload.msg,
                status: action.payload.status,
                name: action.payload.name
            })

        case CLEAR_ERRORS:
            return ({
                msg: {},
                status: null,
                name: null
            })

        default:
            return state;
    }   
}