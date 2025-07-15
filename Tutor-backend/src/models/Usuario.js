const { DataTypes } = require('sequelize');
const db = require('../config/database').getConnection();

const Usuario = db.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,

  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('estudiante', 'tutor', 'administrador'),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false,
  tableName: 'usuarios'
});

module.exports = Usuario;
