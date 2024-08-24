const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

const ROOMS_TABLE = 'rooms';

class rooms extends Model {
  static associate(models) {
    // Define associations here if necessary
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROOMS_TABLE,
      modelName: 'Rooms',
      timestamps: false
    }
  }
}

const roomsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: 'id',
    primaryKey: true,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users', // Assuming you have a users table
      key: 'dni_id'
    }
  },
  sessionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'session_id'
  },
  status: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'status',
    defaultValue: 'waiting'
  }
}; { timestamps: false };

module.exports = { rooms, roomsSchema };
