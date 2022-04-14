import React from 'react'
import Todo from './todo'
import './styles/todos.css'

export default function Todos({ todos, deleteTodos, update }) {
    console.log(todos)
    console.log(deleteTodos)

    if (todos.length>0){
        return (

            <>
                {
                    todos.map(todo => (
                        <div className='todolist'>
                            <Todo todo={todo} key={todo.id} deleteTodos={deleteTodos} update={update} />
                        </div>
                    ))
    
                }
            </>
    
    
        )
    }
    else{
        return <p className='sorry'>No items to display. Kindly add an item.</p>
    }
   
}
