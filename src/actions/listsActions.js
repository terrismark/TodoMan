import { DELETE_LIST, ADD_LIST } from './types'

export function addList(list) {
    return {
        type: ADD_LIST,
        payload: list,
    }
}

export function deleteList(listId) {
    return {
        type: DELETE_LIST,
        payload: listId,
    }
}
