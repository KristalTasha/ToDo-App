import React from 'react'
import { useState } from 'react'
import './todo.css'

export default function Todo({todo, deleteTodos, update}) {

  const [check, setCheck] = useState(false)

  function toggleCheck(todo){

    setCheck(true)
    update(todo.id)
  
  }

  return (
    <div className='todo-item' style={ todo.status === 'Pending' ? { backgroundColor: 'lightgrey' } : {backgroundColor: 'palegreen'}}>
      <div className='tobedone'>
      {/* <input className='cbox ' type="checkbox" checked={true ? todo.status === 'Done' : todo.status === 'Pending'}></input> */}
      <input className='cbox ' type="checkbox" onClick={() => toggleCheck(todo)}></input>
      <p style={ todo.status === 'Done' ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{todo.todo}</p>
    </div>

    <div className='btns'>
      <button className='pending' onClick={() => update(todo._id)}>{todo.status}</button>
      <button className='delete' onClick={() => deleteTodos(todo._id)}>Delete</button>
    </div>
    </div>
  )
}

// checked={true ? todo.status === 'Done' : todo.status === 'Pending'