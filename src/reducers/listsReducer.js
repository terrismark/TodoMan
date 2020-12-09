import { GET_LISTS, ADD_LIST, DELETE_LIST, LOADING_LISTS } from '../actions/types'

const lists = {
    items: [],
    loadingLists: false
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

        case LOADING_LISTS:
            return {
                ...state,
                loadingLists: true
            }

        default:
            return state;
    }   
}