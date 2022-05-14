import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/page-blocks.css';

function Header({ person }) {
  const redirect = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('logged'))

  const logout = async (e) => {
    try {
      const exit = await axios.get(`/user/logout/${user.userId}`)
      const { exited } = exit;

      if (exit) {
        window.localStorage.removeItem('logged');
        redirect('/', { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className='login-nav'>


      {!user ?
        <>
          <NavLink to="/" className="login-link">Login</NavLink>
          <NavLink to="/home" className="home-link">Home</NavLink>
          <NavLink to="/signup" className="signup-link">Signup</NavLink>
        </>
        :
        <>
          <NavLink to='/send-mail' className='reset'>Reset Password</NavLink>
          <button className='logout' onClick={logout}>Logout</button>
          <div>Welcome {user.userEmail}</div>
        </>
      }

    </nav>
  )
}


function SendEmailForm() {
  const [email, setUserEmail] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const sendMail = async (e) => {
    try {
      e.preventDefault();

      console.log('the email---', email)

      const sent = await axios.post('/user/reset-mailer',
        {
          email
        });

      if (sent) {
        console.log('sent res msg----', sent)
        setUserEmail('');
        setSuccessMsg(sent.data)
      }

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div className='mod-cont'>
     { successMsg ? <p className='success-msg'>{successMsg}</p> : null }  
      <div className='mod-box'>
        <h1 className='e-form-title'>Reset Password</h1>
        <p>A link to reset your password will be sent to you email address.</p>
        <p>Kindly confirm your email address</p>
        <form className='email-form'>
          <input type='text' className='reset-email' placeholder='Email' onChange={(e) => setUserEmail(e.target.value)} />
          <button action='submit' className='reset-submit' onClick={sendMail}>Submit</button>
        </form>
      </div>
    </div>
  )
}


function PassResetForm() {

  const [password, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewP, setConfirmNewP] = useState('')
  const redirect = useNavigate();

 
  const resetPassword = async (e) => {
    try{
      e.preventDefault();

      const user = JSON.parse(window.localStorage.getItem('logged'))
      console.log('the user--', user.userEmail)
      // setTheEmail(user.userEmail);  
      console.log('the email resetting paswd ---', email)  

       if(confirmNewP !== newPassword){
          alert('Passwords do not match');
      } else{

        const resetDone = await axios.put('/user/reset-password', 
        {
          email : user.userEmail,
          password,
          newPassword
        })

        console.log('the email resetting paswd ---', email)  
  
        if(resetDone){
          console.log('the reset done response ---', resetDone)
          const exit = await axios.get(`/user/logout/${user.userId}`)
          if (exit) {
            console.log('logged out message---', exit)
            window.localStorage.removeItem('logged');
            redirect('/', { replace: true })
          }
        }
  

      }

     
    } catch(error){
      console.log(error)
    }
  }

  return (

    <div className='preset-form-cont'>

      <form className='preset-form'>
        <h1>Reset Password</h1>
        <input className='preset-input' type='password' placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} />
        <input className='preset-input' type='password' placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} />
        <input className='preset-input' type='password' placeholder='Confirm New Password' onChange={(e) => setConfirmNewP(e.target.value)} />

        <button action='submit' onClick={resetPassword}>Submit</button>
      </form>

    </div>
  )
}



export default {
  Header,
  SendEmailForm,
  PassResetForm
}
