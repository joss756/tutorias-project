// src/controllers/solicitud.controller.js
const Solicitud = require('../models/Solicitud');

exports.listar = async (req, res) => {
  try {
    const lista = await Solicitud.findAll();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nueva = await Solicitud.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.obtenerPorId = async (req, res) => {
  const solicitud = await Solicitud.findByPk(req.params.id);
  if (!solicitud) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }
  res.json(solicitud);
};

// ✅ Actualizar solicitud
exports.actualizar = async (req, res) => {
  const id = req.params.id;
  try {
    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    await solicitud.update(req.body);
    res.json(solicitud);
  } catch (err) {
    console.error('Error al actualizar solicitud:', err);
    res.status(500).json({ error: 'Error al actualizar la solicitud' });
  }
};

// ✅ Eliminar solicitud
exports.eliminar = async (req, res) => {
  const solicitud = await Solicitud.findByPk(req.params.id);
  if (!solicitud) {
    return res.status(404).json({ error: 'Solicitud no encontrada' });
  }
  await solicitud.destroy();
  res.json({ mensaje: 'Solicitud eliminada' });
};
