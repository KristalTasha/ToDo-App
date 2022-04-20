import React from 'react'
import { NavLink } from 'react-router-dom';

function Header() {
  return (
  <nav className='login-nav'>
    <NavLink to="/home" className="home-link">Home</NavLink>
    <NavLink to="/" className="login-link">Login</NavLink>
    <NavLink to="/signup" className="signup-link">Signup</NavLink>
  </nav>
  )
}

export default {
    Header
}
