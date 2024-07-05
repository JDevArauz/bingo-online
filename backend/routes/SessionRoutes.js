const SessionController = require('../controllers/SesionControllers');
const Router = require('express').Router();

Router
    .post('/login', SessionController.Login)
    .put('/logout', SessionController.Logout);


module.exports = Router;
