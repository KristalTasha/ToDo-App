import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './styles/login.css'
import './styles/signup.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [person, setPerson] = useState(false)
  const history = useNavigate();
  
  
  const login = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post(
        "/user/login",
        {
          email,
          password
        }
      );
  
      const { data } = response;
      console.log('data from response ---', data)
  
      if(data.userId){
        console.log('data after if statement ---', data)
        // setPerson(true);
        window.localStorage.setItem('logged', JSON.stringify(data));
        // console.log('the person---', person)
        history("/home", {replace: true})
        
      }
  
  
    } catch (error){
      console.log(error);
    }
  }
  
  

  return (
    <div className='login-page'>

      <form className='login-form'>
      <div className='user-logo'>
      <i class="fa-solid fa-circle-user"></i>
      </div>

        <div className="form-item">
          <div className='icon-hold'><i class="fa-solid fa-user"></i></div>
          <input type="text" placeholder='Email' className='email' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-item">
          <div className='icon-hold'><i class="fa-solid fa-lock"></i></div>
          <input type='password' className="pswd" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className='tips'>

        <div className="form-tips">
          <div className='remember'>
            <input type="checkbox" className='checkbox'/>
            <p className='rem-text'>Remember me</p>
          </div>
          <div className='forgot'>
            <p className='forgot-text'>Forgot password?</p>
          </div>
        </div>

        <div className="form-tip">
         <p className='dont-text'>Don't have an account?</p>
         <Link to="/signup" className='log-link'>Sign-up</Link>
        </div>

        </div>

        
        <button action="submit" className="submit" onClick={login}>Login</button>
      </form>
    </div>
  )
}
