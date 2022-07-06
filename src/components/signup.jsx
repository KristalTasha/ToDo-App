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
  const [loading, setLoading] = useState(false)
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

      setLoading(true)

      const success = await axios.post('/user/signup',
        {
          email,
          password
        });


      
      console.log('pending signup response', success)

      const { data } = success;

      if(data){
        console.log('the success message---', data)
        setSuccessMsg(data)
        setEmail('')
        setPassword('')
        setLoading(false)
        //navigate('/', {replace: true})
      }
    } catch(error){
      setLoading(true)
      let theError = error.response.data

      if(theError.includes('Email') || theError.includes('email')){
        console.log('the error', error.response.data)
        setEmailErr(error.response.data)
        setLoading(false)

      } else if (theError.includes('Password') || theError.includes('password')){
        console.log('the error', error.response.data)
        setPswdErr(error.response.data)
        setLoading(false)
      }
     
    }
  }

  return (
    <div className='signup-page'>

     { successMsg ? 
     
     <p className='signup-success'>{successMsg}</p> 
     
     : 

      <>
      {loading ? <p className='please-wait'>Please wait...</p> : null }
      
      

      <form className='signup-form'>
      <div className='user-logo'>
      <i class="fa-solid fa-circle-user"></i>
      </div>

        <div className="form-item">
          <div className='sign-icon-hold'><i class="fa-solid fa-user"></i></div>
          <input type="text" placeholder='Email' className='sign-email' onChange={(e) => setEmail(e.target.value)}  value={email} />
          
        </div>

        { 
        
          emailErr ? <span className='email-error'>{emailErr}</span> : null
      
        }

        <div className="form-item">
          <div className='sign-icon-hold'><i class="fa-solid fa-lock"></i></div>
          <input type={passwordType} className="sign-pswd" placeholder='Password' minLength='6' onChange={(e) => setPassword(e.target.value)} value={password} />
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
      </>

        }

    </div>
  )
}