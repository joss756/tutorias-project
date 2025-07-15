// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListarComponent } from './features/solicitudes/listar/listar.component';
import { CrearComponent } from './features/solicitudes/crear/crear.component';
import { EditarComponent } from './features/solicitudes/editar/editar.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { TutorComponent } from './dashboard/tutor/tutor.component';
import {
  AuthGuard,
  LoginGuard,
  RoleGuardAdmin,
  RoleGuardEstudiante,
  RoleGuardTutor
} from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: LoginComponent,  canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'materias', loadChildren: () => import('./features/materias/materias.module').then(m => m.MateriasModule) },
      { path: 'notificaciones', loadChildren: () => import('./features/notificaciones/notificaciones.module').then(m => m.NotificacionesModule) },
      { path: 'seguimientos', loadChildren: () => import('./features/seguimientos/seguimientos.module').then(m => m.SeguimientosModule) },
      // ESTUDIANTE
      {
        path: 'solicitudes',
        component: ListarComponent,
        canActivate: [RoleGuardEstudiante]
      },
      {
        path: 'solicitudes/crear',
        component: CrearComponent,
        canActivate: [RoleGuardEstudiante]
      },
      {
        path: 'solicitudes/editar/:id',
        component: EditarComponent,
        canActivate: [RoleGuardEstudiante]
      },

      // ADMINISTRADOR
      {
        path: 'asignaciones',
        component: AdminComponent,
        canActivate: [RoleGuardAdmin]
      },

      // TUTOR
      {
        path: 'sesiones',
        component: TutorComponent,
        canActivate: [RoleGuardTutor]
      },

      // fallback dentro de dashboard
      { path: '', redirectTo: 'solicitudes', pathMatch: 'full' }
    ]
  },

  // cualquier otra
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


