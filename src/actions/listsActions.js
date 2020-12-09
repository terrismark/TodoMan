import axios from 'axios'
import { GET_LISTS, DELETE_LIST, ADD_LIST, LOADING_LISTS } from './types'

export const getLists = () => dispatch => {
    dispatch(setListsLoading())
    axios.get('/api/lists')
            .then(res => {
                dispatch({
                    type: GET_LISTS,
                    payload: res.data
                })
            })
}

export const addList = (list) => dispatch => {
    dispatch(setListsLoading())
    const obj = { name: list }
    axios.post('/api/lists', obj)
        .then(res => {
            dispatch({
                type: ADD_LIST,
                payload: res.data
        })})
}

export const deleteList = (listId) => dispatch => {
    dispatch(setListsLoading())
    axios.delete('/api/lists/' + listId)
        .then(() => {
            dispatch({
                type: DELETE_LIST,
                payload: listId,
            })
        })
}

export const setListsLoading = () => {
    return {
        type: LOADING_LISTS
    }
}
