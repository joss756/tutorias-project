// src/models/Seguimiento.js
const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Seguimiento = db.define('seguimientos', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  id_sesion: {
    type: DataTypes.INTEGER, allowNull: false
  },
  id_estudiante: {
    type: DataTypes.INTEGER, allowNull: false
  },
  comentarios: {
    type: DataTypes.TEXT
  },
  calificacion: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 }
  },
  fecha: {
    type: DataTypes.DATE, defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'seguimientos',
  timestamps: false
});

module.exports = Seguimiento;
