import { ADD_LIST, DELETE_LIST } from '../actions/types'

const lists = {
    items: [
        { id: Math.random(), name: "list 1" },
        { id: Math.random(), name: "list 2" }
    ],
    loadingLists: false
}

export default function todoReducer(state = lists, action) {
    let prevLists = [...state.items]
    let prevLoadingState = state.loadingLists
    switch (action.type) {
        case ADD_LIST:
            return ({
                items: [
                    ...prevLists,
                    { id: Math.random(), name: action.payload }
                ],
                loadingLists: prevLoadingState
            })
        case DELETE_LIST:
            return { 
                items: prevLists.filter(list => list.id !== action.payload),
                loadinlists: prevLoadingState
            }
        default:
            return state;
    }   
}