import axios from 'axios';
import React from 'react'
import { useState } from 'react'
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
   
    
    { !user ? 
      <>
       <NavLink to="/" className="login-link">Login</NavLink>
        <NavLink to="/home" className="home-link">Home</NavLink>
        <NavLink to="/signup" className="signup-link">Signup</NavLink>
        </>
      :
      <>
      <button className='reset'>Reset Password</button>
      <button className='logout' onClick={logout}>Logout</button>
      <div>Welcome {user.userEmail}</div>
        </>
    }

  </nav>
  )
}


function PassResetForm(){
  const [userEmail, setUserEmail] = useState('')

return(
  <div className='mod-cont'>
    <p>A link to reset your password will be sent to you email address.</p>
    <p>Kindly confirm your email address</p>
    <form>
    <input type='text' className='reset-email' placeholder='email' onChange={(e) => setUserEmail(e.target.value)}/>
     <button action='submit' className='reset-submit'>Submit</button>
    </form>
  </div>
)
}



export default {
    Header
}
