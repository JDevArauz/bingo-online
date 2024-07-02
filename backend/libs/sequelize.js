
        const { Sequelize } = require('sequelize');
        const  { config } = require('../config/config');
        const setupModels = require('../models');

        const sequelize = new Sequelize(
            config.dbName, // NAME DATABASE
            config.dbUser, // USER DATABASE
            config.dbPassword, // PASSWORD DATABASE
            {
            host: config.dbHost,
            dialect: 'mysql' // TYPE DATABASE
            }
        );

        sequelize.sync();
        setupModels(sequelize);

        module.exports = sequelize;
        