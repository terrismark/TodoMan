import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, UPDATE_TODO } from '../actions/types'

const todos = [
    { id: Math.random(), name: "item 1", done: false },
    { id: Math.random(), name: "item 2", done: true },
    { id: Math.random(), name: "item 3", done: true },
    { id: Math.random(), name: "item 4", done: false }
]

export default function todoReducer(state = todos, action) {
    let prev = [...state]
    switch (action.type) {
        case ADD_TODO:
            return ([
                ...prev,
                { id: Math.random(), name: action.payload, done: false }
            ])
        case DELETE_TODO:
            return prev.filter(todo => todo.id !== action.payload)
        case UPDATE_TODO:
            return (
                prev.map(todo => {
                    if (todo.id === action.payload.todoId) {
                        todo.name = action.payload.todo
                    } 
                    return todo
                })
            )
        case COMPLETE_TODO:
            return (
                prev.map(todo => {
                    if (todo.id === action.payload) {
                        todo.done = !todo.done
                    } 
                    return todo
                })
            )
        default:
            return state;
    }   
}