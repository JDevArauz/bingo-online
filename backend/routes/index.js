
const express = require('express');

// IMPORT ROUTERS
// EXAMPLE: const users = require('./Users.router');
const users = require('./users.router');
const bingos = require('./bingos.router');
const bingoNumbers = require('./bingo_numbers.router');
const roles = require('./roles.router');
const events = require('./events.router');
const states = require('./states.router');
const Session = require('./SessionRoutes');
const authenticateToken = require('../Auth/auth_Middleware');

function routerAPI(app) {
        const router = express.Router();
        app.use('/api', router);

        // DEFINE YOUR ROUTERS HERE
        // EXAMPLE: router.use('/users', users);

        router.use('/users', authenticateToken, users);
        router.use('/bingos', authenticateToken, bingos);
        router.use('/bingo_numbers', authenticateToken, bingoNumbers);
        router.use('/roles', authenticateToken, roles);
        router.use('/events', authenticateToken, events);
        router.use('/states', authenticateToken, states);
        router.use('/session', Session);

}

module.exports = routerAPI;
