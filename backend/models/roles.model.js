
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const ROLES_TABLE = 'roles';

        class roles extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: ROLES_TABLE,
            modelName: 'roles',
            timestamps: false
            }
        }
        }

        const rolesSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        description: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'description'
        },

        };{timestamps: false};

        module.exports = { roles, rolesSchema };
