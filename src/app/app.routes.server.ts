import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Excluir TODAS las rutas dinámicas
  {
    path: 'dashboard/materias/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'dashboard/solicitudes/editar/:id',
    renderMode: RenderMode.Server
  },
  // Si tienes más rutas con :id, agrégalas aquí...
  
  // El resto de rutas sí se prerenderizan
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

