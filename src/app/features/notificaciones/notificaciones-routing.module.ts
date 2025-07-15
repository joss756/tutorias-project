import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarNotificacionesComponent } from './listar-notificaciones/listar-notificaciones.component';

const routes: Routes = [
  { path: '', component: ListarNotificacionesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesRoutingModule {}
