
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const BINGO_NUMBERS_TABLE = 'bingo_numbers';

        class bingo_numbers extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: BINGO_NUMBERS_TABLE,
            modelName: 'bingo_numbers',
            timestamps: false
            }
        }
        }

        const bingo_numbersSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        bingo_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'bingo_id',
        },

        number: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'number'
        },

        };

        module.exports = { bingo_numbers, bingo_numbersSchema };
