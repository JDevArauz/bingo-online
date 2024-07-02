
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const STATES_TABLE = 'states';

        class states extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: STATES_TABLE,
            modelName: 'states',
            timestamps: false
            }
        }
        }

        const statesSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        name: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'name'
        },

        };

        module.exports = { states, statesSchema };
