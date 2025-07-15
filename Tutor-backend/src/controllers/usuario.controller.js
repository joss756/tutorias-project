const Usuario = require('../models/Usuario');

exports.listarPorRol = async (req, res) => {
  const { rol } = req.query;
  if (!rol) return res.status(400).json({ error: 'Falta query param rol' });
  try {
    const tutores = await Usuario.findAll({ where: { rol, activo: true } });
    res.json(tutores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
