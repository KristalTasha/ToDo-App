import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/page-blocks.css';

function Header({person}) {
  const redirect = useNavigate();

  const logout = async (e) => {
    try{
      const exit = await axios.get('http://localhost:8000/api/user/logout')
      const { exited } = exit;

      if(exited){
        redirect('/', { replace: true})
      }
    } catch(error){
        console.log(error)
    }
  }

  return (
  <nav className='login-nav'>
    { person ? <button className='logout' onClick={logout}>Logout</button> : <div></div>  }
    <NavLink to="/home" className="home-link">Home</NavLink>
    <NavLink to="/login" className="login-link">Login</NavLink>
    <NavLink to="/signup" className="signup-link">Signup</NavLink>
  </nav>
  )
}

export default {
    Header
}
