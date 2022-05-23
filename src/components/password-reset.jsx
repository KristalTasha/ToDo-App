import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './styles/page-blocks.css';
import './styles/password-reset.css';

export default function PassResetForm() {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewP, setConfirmNewP] = useState('')
    const [done, setDone] = useState('')
    const [resetErr, setResetErr] = useState('')
    const [passwordType, setPasswordType] = useState('password')


    const user = JSON.parse(window.localStorage.getItem('logged'))
    // const thisEmail = JSON.parse(window.localStorage.getItem('theEmail'))
    const redirect = useNavigate();

    const { resetToken } = useParams()

    const togglePassword = () => {
        if(passwordType === 'password'){
          setPasswordType('text')
          return;
        }
       setPasswordType('password')
      }



    const resetPassword = async (e) => {
        try {
            e.preventDefault();

            if (confirmNewP !== newPassword) {
                alert('Passwords do not match');
            } else {

                if (!user) {
                    const resetDone = await axios.put(`/user/reset-password/${resetToken}`,
                        {
                            newPassword
                        })

                    if (resetDone) {

                        let feedback = resetDone.data.message
                        setDone(feedback)
                        console.log('done--', done)

                        setNewPassword('')
                        setConfirmNewP('')

                        window.localStorage.removeItem('theEmail');
                        window.setTimeout(function () {
                            redirect('/', { replace: true })
                        }, 3000);
                    }

                } else {
                    const resetDone = await axios.put('/user/reset-password',
                        {
                            email: user.userEmail,
                            oldPassword,
                            newPassword
                        })

                    if (resetDone) {
                        let feedback = resetDone.data.message
                        setDone(feedback)
                        setNewPassword('')
                        setConfirmNewP('')
                        const exit = await axios.get(`/user/logout/${user.userId}`)

                        if (exit) {
                            console.log('logged out message---', exit)
                            window.localStorage.removeItem('logged');

                            window.setTimeout(function () {
                                redirect('/', { replace: true })
                            }, 3000);

                        }
                    }
                }



            }


        } catch (error) {
            console.log('the reset error', error.response.data.message)
            setResetErr(error.response.data.message)
        }
    }

    return (

        <div className='preset-form-cont'>

            {done ? <span className='preset-done'>{done}</span> : null}
            {resetErr ? <span className='preset-done'>{resetErr}</span> : null}

            <form className='preset-form'>
                <h1>Reset Password</h1>

               
                {user ? 
                <div className='oldpass'>
               <input className='preset-input' type={passwordType} placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} /> 
                {passwordType === 'password' ?
                    <div className='hideshowpass' onClick={togglePassword}><i class="fa-solid fa-eye-slash"></i></div>
                    :
                    <div className='hideshowpass' onClick={togglePassword}><i class="fa-solid fa-eye"></i></div>
                }
                </div> 
                : null}

                <div className='newpass'>
                <input className='preset-input' type={passwordType} placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} />
                {passwordType === 'password' ?
                    <div className='hideshowpass' onClick={togglePassword}><i class="fa-solid fa-eye-slash"></i></div>
                    :
                    <div className='hideshowpass' onClick={togglePassword}><i class="fa-solid fa-eye"></i></div>
                }
                </div>

                <div className='confnewpass'>
                <input className='preset-input' type='password' placeholder='Confirm New Password' onChange={(e) => setConfirmNewP(e.target.value)} />
                {passwordType === 'password' ?
                    <div className='hideshowpass' onClick={togglePassword}><i class="fa-solid fa-eye-slash"></i></div>
                    :
                    <div className='hideshowpass' onClick={togglePassword}><i class="fa-solid fa-eye"></i></div>
                }
                </div>
                

                <button action='submit' className='preset-submit' onClick={resetPassword}>Submit</button>
            </form>

        </div>
    )

}
