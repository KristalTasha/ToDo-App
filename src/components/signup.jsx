import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/login.css'
import './styles/signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [pswdErr, setPswdErr] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  //const navigate = useNavigate()

  const togglePassword = () => {
    if(passwordType === 'password'){
      setPasswordType('text')
      return;
    }
   setPasswordType('password')
  }

  const signup = async (e) => {
    try{
      e.preventDefault();

      const success = await axios.post(
        'http://localhost:8000/api/user/signup',
        {
          email,
          password
        },
        { withCredentials: true }
        );

      const { data } = success;

      if(data){
        console.log('the success message---', data)
        setSuccessMsg(data)
        setEmail('')
        setPassword('')
        //navigate('/', {replace: true})
      }
    } catch(error){
      let theError = error.response.data

      if(theError.includes('Email') || theError.includes('email')){
        console.log('the error', error.response.data)
        setEmailErr(error.response.data)

      } else if (theError.includes('Password') || theError.includes('password')){
        console.log('the error', error.response.data)
        setPswdErr(error.response.data)
      }
     
    }
  }

  return (
    <div className='signup-page'>

     { successMsg ? 
     
     <p className='signup-success'>{successMsg}</p> 
     
     : 

      <form className='signup-form'>
      <div className='user-logo'>
      <i class="fa-solid fa-circle-user"></i>
      </div>

        <div className="form-item">
          <div className='sign-icon-hold'><i class="fa-solid fa-user"></i></div>
          <input type="text" placeholder='Email' className='sign-email' onChange={(e) => setEmail(e.target.value)} />
          
        </div>

        { 
        
          emailErr ? <span className='email-error'>{emailErr}</span> : null
      
        }

        <div className="form-item">
          <div className='sign-icon-hold'><i class="fa-solid fa-lock"></i></div>
          <input type={passwordType} className="sign-pswd" placeholder='Password' minlength='5' onChange={(e) => setPassword(e.target.value)} />
         { passwordType === 'password' ?  
          <div className='showpass' onClick={togglePassword}><i class="fa-solid fa-eye-slash"></i></div> 
          : 
         <div className='showpass' onClick={togglePassword}><i class="fa-solid fa-eye"></i></div>
         } 
       </div>

        { 
          pswdErr ? <span className='pswd-error'>{pswdErr}</span> : null
        }

        <div className="form-tip">
         <p className='forgot-text'>Already have an account?</p>
         <Link to="/" className='log-link'>Login</Link>
        </div>

        
        <button action="submit" className="sign-submit" onClick={signup}>Sign Up</button>
      </form>

        }

    </div>
  )
}