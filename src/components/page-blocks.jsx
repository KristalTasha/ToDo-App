import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/page-blocks.css';

function Header({person}) {
  const redirect = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('logged'))

  const logout = async (e) => {
    try{
      const exit = await axios.get('/user/logout/:id')
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
    { user ? <button className='logout' onClick={logout}>Logout</button> :  <div></div>    }
    
    { !user ? 
      <>
       <NavLink to="/" className="login-link">Login</NavLink>
        <NavLink to="/home" className="home-link">Home</NavLink>
        <NavLink to="/signup" className="signup-link">Signup</NavLink>
        </>
      :
        <div>Welcome {user.userEmail}</div>
      
    }

  </nav>
  )
}

export default {
    Header
}
