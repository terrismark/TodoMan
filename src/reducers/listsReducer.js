import { GET_LISTS, ADD_LIST, DELETE_LIST, LOADING_LISTS, ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO, LOADING_TODOS } from '../actions/types'

const lists = {
    items: [],
    loadingLists: false,
    loadingTodos: false
}

export default function todoReducer(state = lists, action) {
    let prevLists = [...state.items]
    switch (action.type) {

        case GET_LISTS:
            return ({
                items: action.payload,
                loadingLists: false
            })

        case ADD_LIST:
            return ({
                items: [
                    action.payload,
                    ...prevLists
                ], 
                loadingLists: false
            })

        case DELETE_LIST:
            return { 
                items: prevLists.filter(list => list._id !== action.payload),
                loadingLists: false
            }

        case ADD_TODO:
            return ({
                items: prevLists.map(list => {
                    if (list._id === action.payload.listId) {
                        list.todos = action.payload.todos
                    } return list
                }),
                loadingTodos: false
            })

        case DELETE_TODO:
            return { 
                items: prevLists.map(list => {
                    if (list._id === action.payload.listId) {
                        list.todos = list.todos.filter(todo => todo._id !== action.payload.todoId)
                    } return list
                }),
                loadingTodos: false
            }

        case UPDATE_TODO:
            return ({
                items: prevLists.map(list => {
                    if (list._id === action.payload.listId) {
                        list.todos = list.todos.map(todo => {
                            if (todo._id === action.payload.todoId) {
                                todo.name = action.payload.todo
                            } 
                            return todo
                        })
                    } return list
                }),
                loadingTodos: false
            })

        case COMPLETE_TODO:
            return ({
                items: prevLists.map(list => {
                    if (list._id === action.payload.listId) {
                        list.todos = list.todos.map(todo => {
                            if (todo._id === action.payload.todoId) {
                                todo.done = !todo.done
                            } 
                            return todo
                        })
                    } return list
                }),
                loadingTodos: false
            })

        case LOADING_TODOS:
            return {
                ...state,
                loadingTodos: true
            }

        case LOADING_LISTS:
            return {
                ...state,
                loadingLists: true
            }

        default:
            return state;
    }   
}