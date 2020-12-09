import { GET_TODOS, ADD_TODO, COMPLETE_TODO, DELETE_TODO, UPDATE_TODO, LOADING_TODOS } from '../actions/types'

const todos = {
    items: [],
    loadingTodos: false
}

export default function todoReducer(state = todos, action) {
    let prevTodos = [...state.items]
    switch (action.type) {
        case GET_TODOS:
            return ({
                items: action.payload,
                loadingTodos: false
            })
        case ADD_TODO:
            return ({
                items: [
                    action.payload,
                    ...prevTodos
                ], 
                loadingTodos: false
            })

        case DELETE_TODO:
            return { 
                items: prevTodos.filter(todo => todo._id !== action.payload),
                loadingTodos: false
            }

        case UPDATE_TODO:
            return ({
                items: prevTodos.map(todo => {
                    if (todo._id === action.payload.todoId) {
                        todo.name = action.payload.todo
                    } 
                    return todo
                }),
                loadingTodos: false
            })

        case COMPLETE_TODO:
            return ({
                items: prevTodos.map(todo => {
                    if (todo._id === action.payload) {
                        todo.done = !todo.done
                    } 
                    return todo
                }),
                loadingTodos: false
            })

        case LOADING_TODOS:
            return {
                ...state,
                loadingTodos: true
            }
            
        default:
            return state;
    }   
}