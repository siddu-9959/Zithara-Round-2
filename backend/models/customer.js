const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const DB = process.env.DB;
const USER = process.env.USER
const PASS = process.env.PASSWORD
const HOST = process.env.HOST
const DIALECT = process.env.DIALECT

const sequelize = new Sequelize(DB, USER, PASS, {
  host: HOST,
  dialect: DIALECT,
});

const Customer = sequelize.define('customer_data', {
  sno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: DataTypes.INTEGER,
  phone: DataTypes.STRING,
  location: DataTypes.STRING,
  created_at: DataTypes.DATE
});

module.exports = Customer;
