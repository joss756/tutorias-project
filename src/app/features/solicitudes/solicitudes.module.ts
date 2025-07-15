import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { RouterModule } from '@angular/router'; // necesario para routerLink en las vistas
import { FormsModule } from '@angular/forms';   // si usas formularios en Crear
import { SolicitudesRoutingModule } from './solicitudes-routing.module'; // Importa el módulo de rutas
import { HttpClientModule } from '@angular/common/http';
import { EditarComponent } from './editar/editar.component'; // Importa HttpClientModule si necesitas hacer peticiones HTTP

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SolicitudesRoutingModule,
    HttpClientModule

  ]
})
export class SolicitudesModule { }
