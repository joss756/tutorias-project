// src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./config/database').getConnection();

// 1) Inicializa Express antes de usar app.use(...)
const app = express();

// 2) Middlewares globales
app.use(cors());
app.use(express.json());

// 3) Importa tus routers *después* de crear `app`
const authRoutes          = require('./routes/auth.routes');
const usuarioRoutes       = require('./routes/usuario.routes');
const solicitudRoutes     = require('./routes/solicitud.routes');
const materiaRoutes       = require('./routes/materias.routes');
const asignacionRoutes    = require('./routes/asignaciones.routes');
const sesionRoutes        = require('./routes/sesion.routes');
const notificacionRoutes  = require('./routes/notificacion.routes');
const seguimientoRoutes   = require('./routes/seguimientos.routes');

// 4) Monta tus rutas
app.use('/api/auth',          authRoutes);
app.use('/api/usuarios',      usuarioRoutes);
app.use('/api/solicitudes',   solicitudRoutes);
app.use('/api/materias',      materiaRoutes);
app.use('/api/asignaciones',  asignacionRoutes);
app.use('/api/sesiones',      sesionRoutes);
app.use('/api/notificaciones',notificacionRoutes);
app.use('/api/seguimientos',  seguimientoRoutes);

// 5) Ruta de diagnóstico
app.get('/ping', async (req, res) => {
  try {
    await database.authenticate();
    res.json({ msg: 'pong', db: 'ok' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al conectar DB', error: err.message });
  }
});

// 6) Sincroniza y arranca
const PORT = process.env.PORT || 3000;
database.sync()
  .then(() => {
    console.log('✔️ Modelos sincronizados');
    app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));

