import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import listsReducer from './listsReducer'

export default combineReducers({
    todos: todosReducer,
    lists: listsReducer
})