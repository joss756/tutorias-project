// controllers/estadisticas.controller.js
const Solicitud = require('../models/Solicitud');
const { fn, col } = require('sequelize');

async function stats(req, res) {
  const total = await Solicitud.count();
  const finalizadas = await Solicitud.count({ where: { estado: 'finalizada' } });
  const porTutor = await Solicitud.findAll({
    attributes: ['id_tutor', [fn('COUNT', col('id')), 'count']],
    group: ['id_tutor']
  });
  res.json({ total, finalizadas, porTutor });
}
module.exports = { stats };
