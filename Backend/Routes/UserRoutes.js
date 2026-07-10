const {CreateUser,GetAllUsers}= require('../Controller/UserController');
const express = require('express');
const router = express.Router();

router.post('/create', CreateUser);
router.get('/all',GetAllUsers);

module.exports = router;