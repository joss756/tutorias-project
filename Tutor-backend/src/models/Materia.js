const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Materia = db.define('materias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'materias'
});

module.exports = Materia;
