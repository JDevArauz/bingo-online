
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const BINGOS_TABLE = 'bingos';

        class bingos extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: BINGOS_TABLE,
            modelName: 'bingos',
            timestamps: false
            }
        }
        }

        const bingosSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        user_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'user_id'
        },

        card_numbers: {
            allowNull: true,
            type: DataTypes.JSON,
            field: 'card_numbers'
        },

        is_winner: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'is_winner'
        },

        };

        module.exports = { bingos, bingosSchema };
