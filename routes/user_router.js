const express = require('express');
const { authUser } = require('../authentication/auth');
const { signUp, logIn, logOut, userTodos, sendPassResetMail, resetPassword } = require('../controller/user_controller');


router = express.Router()

router.post('/signup', signUp)

router.post('/login', logIn)

router.post('/reset-mailer', authUser, sendPassResetMail )

// router.get('/:id', logOut)

router.get('/logout/:id', logOut)

router.get('/todos/:id', userTodos)

// router.get('/reset-password-form')

router.put('/reset-password', resetPassword)



module.exports = router;