// src/models/Notificacion.js
const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Notificacion = db.define('notificaciones', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  id_usuario: {
    type: DataTypes.INTEGER, allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT, allowNull: false
  },
  leida: {
    type: DataTypes.BOOLEAN, defaultValue: false
  },
  fecha: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notificaciones',
  timestamps: false
});

module.exports = Notificacion;
