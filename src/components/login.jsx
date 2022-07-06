import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles/login.css'
import './styles/signup.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailLogErr, setLoginEmailErr] = useState('')
  const [pswdLogErr, setLoginPswdErr] = useState('')
  const [activateSuccess, setActivateSuccess] = useState('')
  const [passwordType, setPasswordType] = useState('password')

  const history = useNavigate();

  const { verificationCode } = useParams()

  const UserVerified = async () => {

    try {
      const verified = await axios.get(`/user/account-activation/${verificationCode}`)
      const { data } = verified;
      console.log('verified msg---', data.message)
      setActivateSuccess(data.message)

    } catch (err) {
      console.log(err)
    }
 
  }

  const RunActivation = () => {
    if (verificationCode){
      UserVerified()
      } 
  }

  useEffect(() => {
    RunActivation()
  }, [])
 
  const togglePassword = () => {
    if(passwordType === 'password'){
      setPasswordType('text')
      return;
    }
   setPasswordType('password')
  }



  const login = async (e) => {
    try {
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

      if (data.userId) {
        console.log('data after if statement ---', data)
        // setPerson(true);
        window.localStorage.setItem('logged', JSON.stringify(data));
        // console.log('the person---', person)
        history("/home", { replace: true })

      }


    } catch (error) {
      console.log('the error', error.response.data);

      let theError = error.response.data

      if (theError.includes('Email') || theError.includes('email')) {
        // console.log('the error', error.response.data)
        setLoginEmailErr(theError)

      } else if (theError.includes('Password') || theError.includes('password')) {
        // console.log('the error', error.response.data)
        setLoginPswdErr(theError)
        
      } else if (theError.includes('pending') || theError.includes('Pending')){
        setLoginPswdErr(theError)
      }


    }
  }



  return (
    <div className='login-page'>

      { activateSuccess ? <p className='activated'>{activateSuccess}</p> : null} 

      <form className='login-form'>
        <div className='user-logo'>
          <i class="fa-solid fa-circle-user"></i>
        </div>

        <div className="form-item">
          <div className='icon-hold'><i class="fa-solid fa-user"></i></div>
          <input type="text" placeholder='Email' className='email' onChange={(e) => setEmail(e.target.value)} required />
        </div>

        {
          emailLogErr ? <span className='email-error'>{emailLogErr}</span> : null
        }

        <div className="form-item">
          <div className='icon-hold'><i class="fa-solid fa-lock"></i></div>
          <input type={passwordType} className="pswd" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          { passwordType === 'password' ?  
          <div className='hidepass' onClick={togglePassword}><i class="fa-solid fa-eye-slash"></i></div> 
          : 
         <div className='hidepass' onClick={togglePassword}><i class="fa-solid fa-eye"></i></div>
         } 
        </div>

        {
          pswdLogErr ? <span className='pswd-error'>{pswdLogErr}</span> : null
        }

        <div className='tips'>

          <div className="form-tips">
            {/* <div className='remember'>
              <input type="checkbox" className='checkbox' />
              <p className='rem-text'>Remember me</p>
            </div> */}
            <div className='forgot'>
              {/* <p className='forgot-text'>Forgot password?</p> */}
              <Link to='/send-mail' className='forgot-text'>Forgot password?</Link>
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
