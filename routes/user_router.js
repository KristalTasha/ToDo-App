const express = require('express');
const { authUser } = require('../authentication/auth');
const { signUp, logIn, logOut, userTodos, resetPassword } = require('../controller/user_controller');

router = express.Router()

router.post('/signup', signUp)

router.post('/login', logIn)

// router.get('/:id', logOut)

router.get('/logout/:id', logOut)

router.get('/todos/:id', userTodos)

router.put('/reset-password', authUser, resetPassword)



module.exports = router;