// src/controllers/seguimiento.controller.js
const Seguimiento = require('../models/Seguimiento');

async function listar(req, res) {
  try {
    const list = await Seguimiento.findAll();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function detalle(req, res) {
  try {
    const seg = await Seguimiento.findByPk(+req.params.id);
    if (!seg) return res.status(404).json({ error: 'No encontrado' });
    res.json(seg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function crear(req, res) {
  try {
    const { id_sesion, id_estudiante, comentarios, calificacion } = req.body;
    const nuevo = await Seguimiento.create({
      id_sesion, id_estudiante, comentarios, calificacion
    });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function actualizar(req, res) {
  try {
    const seg = await Seguimiento.findByPk(+req.params.id);
    if (!seg) return res.status(404).json({ error: 'No encontrado' });
    Object.assign(seg, req.body);
    await seg.save();
    res.json(seg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    const seg = await Seguimiento.findByPk(+req.params.id);
    if (!seg) return res.status(404).json({ error: 'No encontrado' });
    await seg.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listar, detalle, crear, actualizar, eliminar };

