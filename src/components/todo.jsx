import React from 'react'
import { useState } from 'react'
import './styles/todo.css'

export default function Todo({todo, deleteTodos, update}) {

  const [check, setCheck] = useState(false)

  function toggleCheck(todo){
    if(todo.status === 'Pending'){
      setCheck(false)
      update(todo._id)
    } else if(todo.status === 'Done'){
      setCheck(true)
      update(todo._id)
    }
   
  
  }

  return (
    <div className='todo-item'>
      <div className='tobedone'>
      {/* <input className='cbox ' type="checkbox" checked={true ? todo.status === 'Done' : todo.status === 'Pending'}></input> */}
      <input className='cbox ' type="checkbox" onClick={() => toggleCheck(todo)} value={check} checked={true ? todo.status === 'Done' : todo.status === 'Pending'}></input>
      <p style={ todo.status === 'Done' ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{todo.todo}</p>
    </div>

    <div className='btns'>

      <button className='pending' onClick={() => update(todo._id)}
      style={ todo.status === 'Pending' ? { backgroundColor: 'sandybrown' } : {backgroundColor: 'rgb(0, 76, 0)'}}
      >{todo.status}</button>

      <button className='delete' onClick={() => deleteTodos(todo._id)}> x </button>
    </div>
    </div>
  )
}

// checked={true ? todo.status === 'Done' : todo.status === 'Pending'