import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RoleGuard } from '../auth/auth.guard';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { TutorComponent } from './tutor/tutor.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'estudiante' // ✅ Redirección por defecto
      },
      {
        path: 'estudiante',
        component: EstudianteComponent,
        canActivate: [RoleGuard],
        data: { roles: ['estudiante'] }
      },
      {
        path: 'tutor',
        component: TutorComponent,
        canActivate: [RoleGuard],
        data: { roles: ['tutor'] }
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: { roles: ['administrador'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
