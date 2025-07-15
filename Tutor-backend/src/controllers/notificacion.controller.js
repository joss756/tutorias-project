// src/controllers/notificaciones.controller.js
const Notificacion = require('../models/Notificacion');

async function listar(req, res) {
  try {
    // si quieres por usuario: /api/notificaciones/:usuarioId
    const where = req.params.usuarioId
      ? { where: { id_usuario: +req.params.usuarioId } }
      : {};
    const list = await Notificacion.findAll(where);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function crear(req, res) {
  try {
    const { id_usuario, mensaje } = req.body;
    const nueva = await Notificacion.create({ id_usuario, mensaje });
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function marcarLeida(req, res) {
  try {
    const not = await Notificacion.findByPk(+req.params.id);
    if (!not) return res.status(404).json({ error: 'No encontrada' });
    not.leida = true;
    await not.save();
    res.json(not);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listar, crear, marcarLeida };
