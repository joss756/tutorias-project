// src/routes/solicitud.routes.js
const express = require('express');
const router = express.Router();
const { listar, crear, obtenerPorId, actualizar, eliminar } = require('../controllers/Solicitud.controller');

router.get('/', listar);
router.post('/', crear);
router.get('/:id', obtenerPorId);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;
