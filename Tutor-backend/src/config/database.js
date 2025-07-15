const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {
    if (!Database.instance) {
      this._sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        { host: process.env.DB_HOST, dialect: 'mysql', logging: false }
      );
      Database.instance = this;
    }
    return Database.instance;
  }
  getConnection() {
    return this._sequelize;
  }
}

module.exports = new Database();
