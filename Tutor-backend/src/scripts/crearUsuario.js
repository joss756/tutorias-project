const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

(async () => {
  try {
    // Verificar si el usuario ya existe
    const existente = await Usuario.findOne({ where: { correo: 'admin@tutorias.com' } });

    if (existente) {
      console.log('⚠️ El usuario ya existe con ese correo:', existente.correo);
      process.exit(0);
    }

    const hash = await bcrypt.hash('123456', 10); // contraseña de prueba

    const nuevo = await Usuario.create({
      nombre: 'Administrador',
      correo: 'admin@tutorias.com',
      password: hash,
      rol: 'administrador',
      activo: true
    });

    console.log('Usuario creado:', nuevo.nombre);
    process.exit();
  } catch (err) {
    console.error('Error creando usuario:', err.message);
    process.exit(1);
  }
})();
