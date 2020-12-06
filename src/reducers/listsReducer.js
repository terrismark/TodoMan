import { ADD_LIST, DELETE_LIST } from '../actions/types'

const lists = [
    { id: Math.random(), name: "list 1" },
    { id: Math.random(), name: "list 2" },
]

export default function todoReducer(state = lists, action) {
    let prev = [...state]
    switch (action.type) {
        case ADD_LIST:
            return ([
                ...prev,
                { id: Math.random(), name: action.payload }
            ])
        case DELETE_LIST:
            return prev.filter(list => list.id !== action.payload)
        default:
            return state;
    }   
}