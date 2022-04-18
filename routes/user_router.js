const express = require('express');
const { signUp, logIn, logOut } = require('../controller/user_controller');
router = express.Router()

router.post('/', signUp)

router.get('/', logIn)

router.get('/:id', logOut)


module.exports = router;