const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Popup = sequelize.define('Popup', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  imageurl: {
    type: DataTypes.STRING(2000),
    allowNull: true
  },
  latitude: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  longitude: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  // Sequelize options
  timestamps: false,
  tableName: 'popup'
});

module.exports = Popup;
