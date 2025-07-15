const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../utils/jwt');

// ✅ FUNCIÓN DE LOGIN
const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generarToken(usuario);
    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
};

// ✅ FUNCIÓN DE REGISTRO
const register = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    // Verificar si ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(409).json({ message: 'El usuario ya está registrado' });
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: hash, // Aquí debe coincidir con tu modelo y tabla
      rol
    });

    const token = generarToken(nuevoUsuario);
    res.json({
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol,
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};

module.exports = { login, register };
