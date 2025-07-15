const router = require('express').Router();
const { listarPorRol } = require('../controllers/usuario.controller');

router.get('/', listarPorRol); // /api/usuarios?rol=tutor

module.exports = router;
