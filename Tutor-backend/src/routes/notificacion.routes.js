// src/routes/notificaciones.routes.js
const express = require('express');
const router = express.Router();
const {
  listar,
  crear,
  marcarLeida
} = require('../controllers/notificacion.controller');

// GET  /api/notificaciones               → todos
// GET  /api/notificaciones/:usuarioId   → solo de un usuario
router.get('/', listar);
router.get('/:usuarioId', listar);

// POST /api/notificaciones
router.post('/', crear);

// PUT  /api/notificaciones/:id/leida
router.put('/:id/leida', marcarLeida);

module.exports = router;
