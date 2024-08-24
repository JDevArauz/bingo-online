
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const WINNERS_PER_EVENT_TABLE = 'winners_per_event';

        class winners_per_event extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: WINNERS_PER_EVENT_TABLE,
            modelName: 'winners_per_event',
            timestamps: false
            }
        }
        }

        const winners_per_eventSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        event_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'event_id'
        },

        user_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'user_id',
            references: {
                model: 'users', // Assuming you have a users table
                key: 'dni_id'
            }
        },

        };

        module.exports = { winners_per_event, winners_per_eventSchema };
