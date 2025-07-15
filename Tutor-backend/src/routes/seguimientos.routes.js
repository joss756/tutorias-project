// src/routes/seguimientos.routes.js
const express = require('express');
const router = express.Router();
const {
  listar,
  detalle,
  crear,
  actualizar,
  eliminar
} = require('../controllers/seguimiento.controller');

router.get('/', listar);
router.get('/:id', detalle);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;

