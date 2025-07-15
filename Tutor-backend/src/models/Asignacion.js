// src/models/Asignacion.js
const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Asignacion = db.define('asignaciones', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  id_solicitud: {
    type: DataTypes.INTEGER, allowNull: false
  },
  id_tutor: {
    type: DataTypes.INTEGER, allowNull: false
  },
  fecha_asignacion: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'asignaciones',
  timestamps: false
});

module.exports = Asignacion;
