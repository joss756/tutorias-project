import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EstudianteComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
