const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

const EVENTS_PER_USER_TABLE = 'events_per_user';

class events_per_user extends Model {

    static associate(models) {
        // Define associations here if necessary
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EVENTS_PER_USER_TABLE,
            modelName: 'events_per_user',
            timestamps: false
        }
    }
}

const events_per_userSchema = {

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
        type: DataTypes.STRING, 
        field: 'user_id',
        references: {
            model: 'users',
            key: 'dni_id'
        }
    },

}; { timestamps: false };

module.exports = { events_per_user, events_per_userSchema };