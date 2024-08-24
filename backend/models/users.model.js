
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

const USERS_TABLE = 'users';

class users extends Model {

    static associate(models) {
        // Define associations here if necessary
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USERS_TABLE,
            modelName: 'users',
            timestamps: false
        }
    }
}

const usersSchema = {
    name: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'name'
    },

    email: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'email'
    },

    role_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'role_id',
        references: {
            model: 'roles',
            key: 'id'
        }
    },

    dni_id: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'dni_id',
        primaryKey: true
    },

    password: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'password'
    },

    /* Pendiente de implementar la verificación de email 
    email_verified_at: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'email_verified_at'
    },*/

    remember_token: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'remember_token'
    },
};
{ timestamps: false }

module.exports = { users, usersSchema };
