import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, getTodos } from '../actions/todoActions'
import Loader from '../components/Loader.js'

const TodoList = () => {

    const dispatch = useDispatch()

    const {userInfo} = useSelector((state)=>state.userLogin)
    const [todoDescription, setTodoDescription] = useState('')
    const [todoUserId, setTodoUserId] = useState(userInfo._id)
    const { todoList } = useSelector((state)=>state.todoList) 
    

    const {todoAddLoading} = useSelector((state)=>state.todoAdd)
    const {todoListLoading} = useSelector((state)=>state.todoList)
    const {todoDeleteLoading} = useSelector((state)=>state.todoDelete)

    const [toggleAdd, setToggleAdd] = useState(false)
    const showAddForm = () => {
        if(toggleAdd){
            setToggleAdd(false)
        }else{
            setToggleAdd(true)
        }
    }
    const todoAddHandler =  async(e) => {
        e.preventDefault()
        if(todoUserId && todoDescription){
            await dispatch(addTodo({todoDescription, todoUserId}))
            setTodoDescription('')

        }
    }

    const todoDeleteHandler =  (id) => {
        console.log('Delete :', id)
        dispatch(deleteTodo(id))
    }

    useEffect(()=>{
        dispatch(getTodos())
        
    }, [ dispatch, todoAddLoading, todoDeleteLoading])


    return (
        <div className="container">
            <button className="btn text-success" onClick={showAddForm}>+ Add Item</button>
            {todoDeleteLoading && <Loader variant='danger' /> }
            {
                toggleAdd &&
                <form onSubmit={todoAddHandler} className='row'>
                    <input type="text" value={todoDescription} placeholder='write your activity here' className='col form-control' onChange={(e)=>setTodoDescription(e.target.value)} />
                    <button type='submit' className='col-auto btn btn-sm btn-success'>{todoAddLoading ? <Loader /> : 'Add Todo'}</button>
                </form> 
            }

            <div className='mt-4 '>
                <h4>My List</h4>
                {/* {todoListLoading && <Loader />} */}
                {
                    todoList ?
                    todoList.map((val,i)=>{
                        return (
                            <div className='row p-2 border' key={val._id}>
                                <p className='col'>{val.todoDescription} </p>
                                <div className='col-auto'>
                                    <button className='btn btn-danger btn-sm' onClick={()=>todoDeleteHandler(val._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                    : <center>No List to show</center>
                }

            </div>
        </div>
    )
}

export default TodoList