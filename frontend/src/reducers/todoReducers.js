import {
    TODO_ADD_REQUEST,
    TODO_ADD_SUCCESS,
    TODO_ADD_FAIL,
    TODO_LIST_REQUEST,
    TODO_LIST_SUCCESS,
    TODO_LIST_FAIL,
    TODO_DELETE_REQUEST,
    TODO_DELETE_SUCCESS,
    TODO_DELETE_FAIL,

} from '../constants/todoConstants.js'

export const todoAddReducer = (state = {}, action) => {
    switch(action.type){
        case TODO_ADD_REQUEST:
            return { todoAddLoading: true }
        case TODO_ADD_SUCCESS:
            return { todoAddLoading: false }
        case TODO_ADD_FAIL:
            return { todoAddloading: false, todoAddError: action.payload }
        default:
            return state;
    }
}

export const todoListReducer = (state = {}, action) => {
    switch(action.type){
        case TODO_LIST_REQUEST:
            return { todoListLoading : true };
        case TODO_LIST_SUCCESS:
            return { todoListLoading: false, todoList: action.payload }
        case TODO_LIST_FAIL:
            return { todoListLoading: false, todoListError: action.payload }
        default:
            return state;
    }
}

export const todoDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case TODO_DELETE_REQUEST:
            return { todoDeleteLoading : true }
        case TODO_DELETE_SUCCESS:
            return { todoDeleteLoading: false}
        case TODO_DELETE_FAIL:
            return { todoDeleteError: action.payload }
        default:
            return state;
    }
}