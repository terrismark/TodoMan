import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGOUT_SUCCESS, 
    AUTH_ERROR, 
    USER_LOADED, 
    USER_LOADING 
} from '../actions/types'

const auth = {
    token: localStorage.getItem('token'),
    isAuthed: false,
    isLoadingUser: true,
    user: null
}

export default function authReducer(state = auth, action) {
    switch (action.type) {

        case USER_LOADING:
            return ({
                ...state,
                isLoadingUser: true
            })

        case USER_LOADED:
            return ({
                ...state,
                isAuthed: true,
                isLoadingUser: false,
                user: action.payload
            })

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token)
            return ({
                ...state,
                ...action.payload,
                isAuthed: true,
                isLoadingUser: false
            })

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return ({
                ...state,
                token: null,
                user: null,
                isAuthed: false,
                isLoadingUser: false
            })

        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return ({
                ...state,
                token: null,
                user: null,
                isAuthed: false,
                isLoadingUser: false
            })

        default:
            return state;
    }   
}