// user router
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// router for auth/login and auth/register
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/:id', userController.getUserDetails);

module.exports = router;
