import React from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Blocks from './page-blocks'
import './styles/login.css'
import './styles/signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='signup-page'>
   
      <Blocks.Header/>

      <form className='signup-form'>
      <div className='user-logo'>
      <i class="fa-solid fa-circle-user"></i>
      </div>

        <div className="form-item">
          <div className='sign-icon-hold'><i class="fa-solid fa-user"></i></div>
          <input type="text" placeholder='Email' className='sign-email' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-item">
          <div className='sign-icon-hold'><i class="fa-solid fa-lock"></i></div>
          <input type='password' className="sign-pswd" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-tip">
         <p className='forgot-text'>Already have an account?</p>
         <Link to="/" className='log-link'>Login</Link>
        </div>

        
        <button action="submit" className="sign-submit">Sign Up</button>
      </form>
    </div>
  )
}