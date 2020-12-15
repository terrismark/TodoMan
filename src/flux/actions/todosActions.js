import axios from 'axios'
import { 
    ADD_TODO, 
    DELETE_TODO, 
    UPDATE_TODO, 
    COMPLETE_TODO, 
    LOADING_TODOS 
} from './types'
import { API_URL } from '../api'

import { tokenConfig } from './authActions'

export const addTodo = (todo, listId) => (dispatch, getState) => {
    dispatch(setTodosLoading())

    const obj = { name: todo }

    axios.post(API_URL + '/api/lists/' + listId, obj, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: { todos: res.data, listId }
        })})
}

export const deleteTodo = (todoId, listId) => (dispatch, getState) => {
    dispatch(setTodosLoading())

    const obj = { 
        id: todoId, 
        type: "delete" 
    }

    axios.patch(API_URL + '/api/lists/' + listId, obj, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: DELETE_TODO,
                payload: { todoId, listId }
            })
        })
}

export const updateTodo = (todo, todoId, listId) => (dispatch, getState) => {

    const obj = { 
        id: todoId,
        name: todo,
        type: "rename"
    }

    axios.patch(API_URL + '/api/lists/' + listId, obj, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: UPDATE_TODO,
                payload: { todo, todoId, listId }
            })
        })
}

export const completeTodo = (todoId, listId) => (dispatch, getState) => {

    const obj = { 
        id: todoId,
        type: "complete"
    }

    axios.patch(API_URL + '/api/lists/' + listId, obj, tokenConfig(getState))
        .then(() => {
            dispatch({
                type: COMPLETE_TODO,
                payload: { todoId, listId }
            })
        })
}

export const setTodosLoading = () => {
    return {
        type: LOADING_TODOS
    }
}