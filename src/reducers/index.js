import { combineReducers } from 'redux'
import listsReducer from './listsReducer'
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'

export default combineReducers({
    lists: listsReducer,
    auth: authReducer,
    error: errorsReducer
})