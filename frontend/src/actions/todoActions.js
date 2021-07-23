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
import { useSelector } from 'react-redux'
import axios from 'axios'

export const addTodo = (todoData) => async (dispatch, getState) => {

    try {
        const {todoDescription, todoUserId} = todoData

        dispatch({
            type: TODO_ADD_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/todos/',
            {
                todoDescription,
                todoUserId
            },
            config
        )

    
        if(data){
            dispatch({
                type: TODO_ADD_SUCCESS
            })
        } 
    } catch (error) {
        dispatch({
            type: TODO_ADD_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }

}

export const getTodos = () => async (dispatch , getState) => {
    try {

        dispatch({
            type: TODO_LIST_REQUEST
        })

        const {
            userLogin: {
                userInfo
            }
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/todos/${userInfo._id}`, config)

        if(data){
            console.log(data)
            dispatch({
                type: TODO_LIST_SUCCESS,
                payload: data
            })
        }
        
    } catch (error) {
        dispatch({
            type: TODO_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteTodo = (_id) => async (dispatch, getState) =>  {

    try {
        dispatch({
            type: TODO_DELETE_REQUEST
        })

        const {
            userLogin: {
                userInfo
            }
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(`/api/todos/${_id}&${userInfo._id}`, config)

        if (data){
            dispatch({
                type: TODO_DELETE_SUCCESS
            })
        }
        
    } catch (error) {
        dispatch({
            type: TODO_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data
                : error.message
        })
    }

}