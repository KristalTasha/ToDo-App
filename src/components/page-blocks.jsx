import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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
          <NavLink to="/home" className="home-link">Home</NavLink>
          <NavLink to="/" className="login-link">Login</NavLink>
          <NavLink to="/signup" className="signup-link">Signup</NavLink>
        </>
        :
        <>
          <NavLink to="/home" className="home-link">Home</NavLink>
          <div>Welcome {user.userEmail}</div>
          <NavLink to='/reset-password' className='reset'>Reset Password</NavLink>
          <button className='logout' onClick={logout}>Logout</button>

        </>
      }

    </nav>
  )
}


function SendEmailForm() {
  const [email, setUserEmail] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [fpError, setfpError] = useState('');

  const sendMail = async (e) => {
    try {
      e.preventDefault();

      // console.log('the email---', email)

      const sent = await axios.post('/user/reset-mailer',
        {
          email
        });

      if (sent) {
        console.log('sent res msg----', sent)
        setUserEmail('');
        setSuccessMsg(sent.data)
        //window.localStorage.setItem('theEmail', JSON.stringify(email));
      }

    } catch (error) {
      console.log(error.response.data)
      setfpError(error.response.data)
    }


  }

  return (
    <div className='mod-cont'>
      { 
      successMsg ? <p className='success-msg'>{successMsg}</p> 
      : 
      <div className='mod-box'>
        <h1 className='e-form-title'>Reset Password</h1>
        <p>A link to reset your password will be sent to you email address.</p>
        <p>Kindly confirm your email address</p>
        <form className='email-form'>
          <div className='e-form'>
            <input type='text' className='reset-email' placeholder='Email' onChange={(e) => setUserEmail(e.target.value)} />
            <button action='submit' className='reset-submit' onClick={sendMail}>Submit</button>
          </div>
          <span className='email-error'>{fpError}</span>
        </form>

      </div>

    }
    </div>
  )
}




export default {
  Header,
  SendEmailForm
}
