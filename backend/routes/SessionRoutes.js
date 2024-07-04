const SessionController = require('../controllers/SesionControllers');
const Router = require('express').Router();

Router
    .post('/login', SessionController.Login)
    .put('/logout/:id', SessionController.Logout);


module.exports = Router;
