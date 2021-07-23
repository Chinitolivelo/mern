import mongoose from 'mongoose'

const Schema = mongoose.Schema

const todoSchema = new Schema(
    {
        todoDescription: {
            type: String,
            required: true
        },
        todoUserId: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        }
    },
    {
        collection: 'todos',
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', todoSchema)
export default Todo