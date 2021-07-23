import Todo from "../models/Todo.js";
import asyncHandler from 'express-async-handler';
import AppError from "../utils/apperror.js";

// @desc add todo data to database
// @route /api/todos POST
// @access Private
const addTodo = asyncHandler(async(req, res, next)=>{
    const {todoDescription, todoUserId} = req.body

    const todo = await Todo.create({
        todoDescription,
        todoUserId
    })

    console.log(todo)

    if(todo){
        res.status(201)
        res.json(todo)
    }else{
        res.status(400)
        throw new Error('Invalid Data');
    }
})


// @desc delete todo entry
// @route /api/todos/:_id&:_todoUsesrId DELETE
// @access Private
const deleteTodo = asyncHandler(async(req,res,next)=>{
    const {_id, todoUserId} = req.params

    const todo = await Todo.findById(_id)
    if(todo.todoUserId == todoUserId){
        todo.delete()
        res.status(201)
        res.json({
            message: 'Activity successfully deleted'
        })
    }else{
        res.status(404)
        throw new AppError('Unauthorized User')
    }
})

// @desc fetch todo list
// @route /api/todos GET
// @acess Private
const getTodosById = asyncHandler(async(req,res,next)=>{
    const {todoUserId} = req.params

    const todos = await Todo.find({
        todoUserId
    })

    if(todos){
        res.status(201)
        res.json(todos)
    }else{
        res.status(404)
        throw new Error('Request not found')
    }
})

export {
    addTodo,
    deleteTodo,
    getTodosById
}