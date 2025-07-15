const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol
    },
    process.env.JWT_SECRET || 'secreto_tutorias',
    { expiresIn: '1h' }
  );
};

module.exports = { generarToken };
