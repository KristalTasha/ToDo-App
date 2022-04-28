const express = require('express');
const { signUp, logIn, logOut, userTodos } = require('../controller/user_controller');

router = express.Router()

router.post('/signup', signUp)

router.post('/login', logIn)

// router.get('/:id', logOut)

router.get('/logout/:id', logOut)

router.get('/todos/:id', userTodos)


module.exports = router;