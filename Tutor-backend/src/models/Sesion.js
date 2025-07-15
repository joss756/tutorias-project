// src/models/Sesion.js
const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Sesion = db.define('sesiones', {
  id: {
    type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
  },
  id_asignacion: {
    type: DataTypes.INTEGER, allowNull: false
  },
  fecha_sesion: {
    type: DataTypes.DATE, allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER
  },
  modalidad: {
    type: DataTypes.ENUM('presencial','en línea'), defaultValue: 'en línea'
  },
  estado: {
    type: DataTypes.ENUM('programada','completada','cancelada'), defaultValue: 'programada'
  }
}, {
  tableName: 'sesiones',
  timestamps: false
});

module.exports = Sesion;
