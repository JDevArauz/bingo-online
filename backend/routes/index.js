
        const express = require('express');

        // IMPORT ROUTERS
        // EXAMPLE: const users = require('./Users.router');
        const users = require('./users.router');
        const bingos = require('./bingos.router');
        const bingoNumbers = require('./bingo_numbers.router');
        const roles = require('./roles.router');
        const events = require('./events.router');
        const states = require('./states.router');

        function routerAPI(app) {
        const router = express.Router();
        app.use('/api', router);

        // DEFINE YOUR ROUTERS HERE
        // EXAMPLE: router.use('/users', users);

        router.use('/users', users);
        router.use('/bingos', bingos);
        router.use('/bingo_numbers', bingoNumbers);
        router.use('/roles', roles);
        router.use('/events', events);
        router.use('/states', states);

}

        module.exports = routerAPI;
