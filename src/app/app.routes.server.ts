import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Ruta dinámica que debe renderizarse solo en el servidor
  {
    path: 'dashboard/materias/editar/:id',
    renderMode: RenderMode.Server
  },
  // El resto de rutas se pueden prerenderizar
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
