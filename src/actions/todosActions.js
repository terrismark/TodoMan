import axios from 'axios'
import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO, LOADING_TODOS } from './types'
import { API_URL } from '../api'

export const getTodos = () => dispatch => {
    dispatch(setTodosLoading())
    axios.get(API_URL + '/api/todos')
            .then(res => {
                dispatch({
                    type: GET_TODOS,
                    payload: res.data
                })
            })
}

export const addTodo = (todo) => dispatch => {
    dispatch(setTodosLoading())
    const obj = { name: todo }
    axios.post(API_URL + '/api/todos', obj)
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: res.data
        })})
}

export const deleteTodo = (todoId) => dispatch => {
    dispatch(setTodosLoading())
    axios.delete(API_URL + '/api/todos/' + todoId)
        .then(() => {
            dispatch({
                type: DELETE_TODO,
                payload: todoId,
            })
        })
}

export const updateTodo = (todo, todoId) => dispatch => {
    const obj = { name: todo }

    axios.patch(API_URL + '/api/todos/' + todoId, obj)
        .then(() => {
            dispatch({
                type: UPDATE_TODO,
                payload: { todo, todoId },
            })
        })
}

export const completeTodo = (todoId) => dispatch => {
    const obj = {}

    axios.patch(API_URL + '/api/todos/' + todoId, obj)
        .then(() => {
            dispatch({
                type: COMPLETE_TODO,
                payload: todoId ,
            })
        })
}

export const setTodosLoading = () => {
    return {
        type: LOADING_TODOS
    }
}