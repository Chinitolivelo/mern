import express from 'express'
import {
    addTodo,
    getTodosById,
    deleteTodo
} from '../controllers/todoController.js'
import { protect, client } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/test', (req, res)=>res.send("Todo Links are working..."))

router.post('/', protect, client , addTodo)

router.get('/:todoUserId', protect, client, getTodosById)

router.delete('/:_id&:todoUserId', protect, client, deleteTodo)

export default router