const express = require('express');
const { signUp, logIn, logOut } = require('../controller/user_controller');
router = express.Router()

router.post('/signup', signUp)

router.post('/login', logIn)

router.get('/:id', logOut)


module.exports = router;