
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const BINGOS_PER_EVENT_TABLE = 'bingos_per_event';

        class bingos_per_event extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: BINGOS_PER_EVENT_TABLE,
            modelName: 'bingos_per_event',
            timestamps: false
            }
        }
        }

        const bingos_per_eventSchema = {

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

        bingo_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'bingo_id'
        },

        };

        module.exports = { bingos_per_event, bingos_per_eventSchema };
