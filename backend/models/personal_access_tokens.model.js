
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const PERSONAL_ACCESS_TOKENS_TABLE = 'personal_access_tokens';

        class personal_access_tokens extends Model {

        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: PERSONAL_ACCESS_TOKENS_TABLE,
            modelName: 'personal_access_tokens',
            timestamps: false
            }
        }
        }

        const personal_access_tokensSchema = {

        id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
        },

        tokenable_type: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'tokenable_type'
        },

        tokenable_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'tokenable_id'
        },

        name: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'name'
        },

        token: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'token'
        },

        abilities: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'abilities'
        },

        last_used_at: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'last_used_at'
        },

        expires_at: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'expires_at'
        },

        created_at: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'created_at'
        },

        updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'updated_at'
        },

        };

        module.exports = { personal_access_tokens, personal_access_tokensSchema };
