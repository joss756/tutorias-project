// src/controllers/materia.controller.js
const Materia = require('../models/Materia');

async function listar(req, res) {
  try {
    const list = await Materia.findAll();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function detalle(req, res) {
  try {
    const mat = await Materia.findByPk(req.params.id);
    if (!mat) return res.status(404).json({ error: 'Materia no encontrada' });
    res.json(mat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function crear(req, res) {
  try {
    const nueva = await Materia.create({ nombre: req.body.nombre });
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function actualizar(req, res) {
  try {
    const mat = await Materia.findByPk(req.params.id);
    if (!mat) return res.status(404).json({ error: 'Materia no encontrada' });
    mat.nombre = req.body.nombre;
    await mat.save();
    res.json(mat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    const mat = await Materia.findByPk(req.params.id);
    if (!mat) return res.status(404).json({ error: 'Materia no encontrada' });
    await mat.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listar, detalle, crear, actualizar, eliminar };
