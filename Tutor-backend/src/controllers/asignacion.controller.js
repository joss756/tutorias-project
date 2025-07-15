// src/controllers/asignacion.controller.js
const Asignacion = require('../models/Asignacion');
const Solicitud  = require('../models/Solicitud');
const Usuario    = require('../models/Usuario');

// 1) Listar todas las asignaciones
async function listarAsignaciones(req, res) {
  try {
    const data = await Asignacion.findAll();
    res.json(data);
  } catch (err) {
    console.error('Error en listarAsignaciones:', err);
    res.status(500).json({ error: err.message });
  }
}

// 2) Crear asignación manual
async function crearManual(req, res) {
  try {
    const { id_solicitud, id_tutor } = req.body;
    const nueva = await Asignacion.create({ id_solicitud, id_tutor });
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error en crearManual:', err);
    res.status(500).json({ error: err.message });
  }
}

// 3) Crear asignación automática
async function crearAuto(req, res) {
  try {
    const { id_solicitud } = req.body;
    // lógica para elegir tutor con menos carga...
    const tutors = await Usuario.findAll({ where: { rol: 'tutor' } });
    const cargas = await Promise.all(tutors.map(async t => ({
      tutor: t,
      count: await Asignacion.count({ where: { id_tutor: t.id } })
    })));
    cargas.sort((a, b) => a.count - b.count);
    const elegido = cargas[0].tutor;

    const nueva = await Asignacion.create({
      id_solicitud,
      id_tutor: elegido.id
    });
    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error en crearAuto:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listarAsignaciones, crearManual, crearAuto };
