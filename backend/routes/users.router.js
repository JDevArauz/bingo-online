
const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

router
    .get('/', controller.get)
    .get('/:id', controller.getById)
    .put('/:id', controller.update)
    .delete('/:id', controller._delete);

module.exports = router;
