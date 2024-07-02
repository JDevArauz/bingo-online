
        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../libs/sequelize');

        const PASSWORD_RESET_TOKENS_TABLE = 'password_reset_tokens';

        class password_reset_tokens extends Model {
            
        static associate(models) {
            // Define associations here if necessary
        }

        static config(sequelize) {
            return {
            sequelize,
            tableName: PASSWORD_RESET_TOKENS_TABLE,
            modelName: 'password_reset_tokens',
            timestamps: false 
            }
        }
        }

        const password_reset_tokensSchema = {
        
        email: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'email'
        },
        
        token: {
            allowNull: true,
            type: DataTypes.STRING,
            field: 'token'
        },
        
        created_at: {
            allowNull: true,
            type: DataTypes.DATE,
            field: 'created_at'
        },
        
        };

        module.exports = { password_reset_tokens, password_reset_tokensSchema };
        