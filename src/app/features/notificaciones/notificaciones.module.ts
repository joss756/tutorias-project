// src/app/features/notificaciones/notificaciones.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarNotificacionesComponent } from './listar-notificaciones/listar-notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { FormsModule } from '@angular/forms'; // si usas ngModel

@NgModule({
  declarations: [
    ListarNotificacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotificacionesRoutingModule
  ]
})
export class NotificacionesModule {}


