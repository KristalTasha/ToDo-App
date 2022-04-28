import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/page-blocks.css';

function Header({person}) {
  const redirect = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('logged'))

  const logout = async (e) => {
    try{
      const exit = await axios.get('http://localhost:8000/api/user/logout/:id',
      {withCredentials: true }
      )
      const { exited } = exit;

      if(exit){
        window.localStorage.removeItem('logged');
        redirect('/', { replace: true})
      }
    } catch(error){
        console.log(error)
    }
  }

  return (
  <nav className='login-nav'>
    { user ? <button className='logout' onClick={logout}>Logout</button> : <NavLink to="/login" className="login-link">Login</NavLink>  }
    <NavLink to="/home" className="home-link">Home</NavLink>
    <NavLink to="/signup" className="signup-link">Signup</NavLink>
  </nav>
  )
}

export default {
    Header
}
