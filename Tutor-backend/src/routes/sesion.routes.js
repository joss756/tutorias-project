// src/routes/sesion.routes.js
const router = require('express').Router();
const { listarPorTutor, crearSesion } = require('../controllers/sesion.controller');

// Si listarPorTutor es undefined, el siguiente router.get fallará:
router.get('/tutor/:id', listarPorTutor);
router.post('/', crearSesion);

module.exports = router;
