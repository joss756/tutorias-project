const router = require('express').Router();
const { crearManual, crearAuto, listarAsignaciones } = require('../controllers/asignacion.controller');

router.get('/', listarAsignaciones);
router.post('/', crearManual);          // manual
router.post('/auto', crearAuto);        // auto

module.exports = router;
