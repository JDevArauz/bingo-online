
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
        autoIncrement: true
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
        field: 'state_id',
        references: {
            model: 'states', // Assuming you have a states table
            key: 'id'
        }
    },
    date: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'date'
    },
}; { timestamps: false };

module.exports = { events, eventsSchema };
