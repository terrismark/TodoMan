import { ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO } from './types'

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo,
    }
}

export function deleteTodo(todoId) {
    return {
        type: DELETE_TODO,
        payload: todoId,
    }
}

export function updateTodo(todo, todoId) {
    return {
        type: UPDATE_TODO,
        payload: { todo, todoId },
    }
}

export function completeTodo(todoId) {
    return {
        type: COMPLETE_TODO,
        payload: todoId,
    }
}