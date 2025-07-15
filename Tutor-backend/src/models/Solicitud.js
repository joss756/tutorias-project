const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Solicitud = db.define('solicitudes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tema: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente','asignada','cancelada','finalizada'),
    defaultValue: 'pendiente'
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'solicitudes',
  timestamps: false
});

module.exports = Solicitud;
