// src/controllers/sesion.controller.js
const Sesion = require('../models/Sesion');
const Asignacion = require('../models/Asignacion');

async function listarPorTutor(req, res) {
  const tutorId = +req.params.id;
  try {
    // Busca asignaciones de ese tutor
    const asigns = await Asignacion.findAll({ where: { id_tutor: tutorId }, attributes: ['id'] });
    const ids = asigns.map(a => a.id);
    // Trae sesiones cuya id_asignacion esté en esos ids
    const sesiones = await Sesion.findAll({ where: { id_asignacion: ids } });
    res.json(sesiones);
  } catch (err) {
    console.error('Error en listarPorTutor:', err);
    res.status(500).json({ error: err.message });
  }
}

async function crearSesion(req, res) {
  try {
    const { id_asignacion, fecha_sesion, duracion, modalidad } = req.body;
    const nueva = await Sesion.create({ id_asignacion, fecha_sesion, duracion, modalidad });
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error en crearSesion:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listarPorTutor, crearSesion};
