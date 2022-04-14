import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './styles/login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <div className='login-page'>
      <nav className='login-nav'>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/">Login</NavLink>
    <NavLink to="/signup">Signup</NavLink>
     </nav>

   <form className='login-form'>
       <p className='login-title'>Login</p>
       <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
       <input type='password' placeholder='password' onChange={(e) => setEmail(e.target.value)}/>
       <button action="submit">Login</button>
   </form>
   </div>
  )
}
