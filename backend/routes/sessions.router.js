const controller = require('../controllers/sessions.controller');
const express = require('express');
const router = express.Router();

router
    .post('/login', controller.Login)
    .put('/logout', controller.Logout);


module.exports = router;
