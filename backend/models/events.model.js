
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const EVENTS_TABLE = 'events';

        class events extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: EVENTS_TABLE,
            modelName: 'events',
            timestamps: false
            }
        }
        }

        const eventsSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        event_type: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'event_type'
        },

        location: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'location'
        },

        description: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'description'
        },

        state_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'state_id'
        },

        start_date: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'start_date'
        },

        start_hour: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'start_hour'
        },

        };

        module.exports = { events, eventsSchema };
