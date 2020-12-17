import axios from 'axios'
import { 
    GET_LISTS, 
    DELETE_LIST, 
    ADD_LIST, 
    LOADING_LISTS,
    STOP_LOADING_LISTS
} from './types'
import { API_URL } from '../api'

import { tokenConfig } from './authActions'

export const getLists = () => (dispatch, getState) => {
    dispatch(setListsLoading())

    axios.get(API_URL + '/api/lists', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LISTS,
                payload: res.data
            })
        })
        .catch(e => {
            dispatch(stopListsLoading())
        })
}

export const addList = (list) => (dispatch, getState) => {
    dispatch(setListsLoading())
    
    const obj = { name: list }

    axios.post(API_URL + '/api/lists', obj, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_LIST,
                payload: res.data
        })})
        .catch(e => {
            dispatch(stopListsLoading())
        })
}

export const deleteList = (listId) => (dispatch, getState) => {
    
    axios.delete(API_URL + '/api/lists/' + listId, tokenConfig(getState))
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

export const stopListsLoading = () => {
    return {
        type: STOP_LOADING_LISTS
    }
}